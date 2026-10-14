// Shared by index.js (the audit) and crawl.js (the comparison sheet).

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { csvParse } from 'd3-dsv';
import { affiliationsOf } from '../../src/lib/people.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const DATA_DIR = join(ROOT, 'src', 'data');

// Proposals and decisions, shared with others as this SharePoint sheet
// (`npm run people:review -- --sheet`). A person applies approved rows to
// students or members by hand; scripts never write to those.
export const REVIEW_SHEET = 'people-review';
// Approved changes to students go here (`npm run people:apply`); the students
// sheet itself is kept unchanged as a reference
export const CURATED_SHEET = 'students-curated';
// Decisions made locally with `npm run people:review` (gitignored)
export const DECISIONS_FILE = join(ROOT, 'people-decisions.csv');
export const DECISION_COLUMNS = ['id', 'name', 'action', 'decision', 'note', 'decided'];

/** The people and groups sheets, as exported to src/data/ by msgraph:fetch. */
export function loadSheets() {
	const load = (file) => csvParse(readFileSync(join(DATA_DIR, file), 'utf8'));
	const members = load('members.csv');
	// The curated copy, once it exists, is the up-to-date list of students
	const students = existsSync(join(DATA_DIR, `${CURATED_SHEET}.csv`))
		? load(`${CURATED_SHEET}.csv`)
		: load('students.csv');
	const groups = load('groups.csv');
	// Both people sheets, each row tagged with where it came from
	const everyone = [
		...students.map((row) => ({ ...row, sheet: 'students' })),
		...members.map((row) => ({ ...row, sheet: 'members' }))
	];
	return { members, students, groups, everyone };
}

/**
 * Decisions on proposals, keyed by `${id}|${action}`: from the local file and
 * from the people-review sheet (exported by msgraph:fetch). When both have
 * one, the more recently decided wins.
 * @returns {Map<string, {decision: string, note: string, decided: string}>}
 */
export function loadDecisions() {
	const decisions = new Map();
	const sheetExport = join(DATA_DIR, `${REVIEW_SHEET}.csv`);
	for (const file of [sheetExport, DECISIONS_FILE]) {
		if (!existsSync(file)) continue;
		for (const row of csvParse(readFileSync(file, 'utf8'))) {
			const decision = (row.decision || '').trim().toLowerCase();
			if (!row.id || !row.action || !decision) continue;
			const key = `${row.id}|${row.action}`;
			const prior = decisions.get(key);
			if (!prior || (row.decided || '') >= prior.decided) {
				decisions.set(key, { decision, note: row.note || '', decided: row.decided || '' });
			}
		}
	}
	return decisions;
}

/**
 * Group ids a sheet row belongs to. Students list their groups; members
 * (faculty, staff) lead them via the groups sheet's PI column, since a members
 * row's primaryAffiliation is an institution.
 * @param {{sheet: string, id: string}} row tagged as in loadSheets().everyone
 */
export function groupsOf(row, groups) {
	return row.sheet === 'members'
		? groups.filter((g) => (g.PI || '').split(/\s+/).includes(row.id)).map((g) => g.id)
		: affiliationsOf(row);
}

/**
 * One scraper per group, from sources/.
 * @param {string[]} only group ids to keep; all groups when empty
 */
export async function loadSources(only = []) {
	const sources = [];
	for (const file of readdirSync(join(__dirname, 'sources')).sort()) {
		if (!file.endsWith('.js')) continue;
		const source = (await import(`./sources/${file}`)).default;
		if (only.length === 0 || only.includes(source.group)) sources.push({ ...source, file });
	}
	return sources;
}

/**
 * Run a source, refusing results that look like a broken scraper.
 * @returns {Promise<{lastChanged: Date | null, people: object[]} | {error: string}>}
 */
export async function runSource(source) {
	try {
		const result = await source.fetch();
		// An empty list means the page layout changed, not that everyone left
		if (!result.people.some((p) => p.status === 'current')) {
			return {
				error: `found no current members on ${source.url}; the page layout has probably changed and sources/${source.file} needs updating`
			};
		}
		return result;
	} catch (e) {
		return { error: `could not read ${source.url}: ${e.message}` };
	}
}
