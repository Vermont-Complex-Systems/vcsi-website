// Shared by index.js (the audit) and crawl.js (the comparison sheet).

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { csvParse } from 'd3-dsv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', '..', 'src', 'data');

// Where `people:audit -- --write` puts new people for review. A person moves
// approved rows into students; scripts never write to students itself.
export const REVIEW_SHEET = 'students-crawl';

/** The people and groups sheets, as exported to src/data/ by msgraph:fetch. */
export function loadSheets() {
	const load = (file) => csvParse(readFileSync(join(DATA_DIR, file), 'utf8'));
	const members = load('members.csv');
	const students = load('students.csv');
	const groups = load('groups.csv');
	// Exported like the others by msgraph:fetch, once the sheet exists
	const review = existsSync(join(DATA_DIR, `${REVIEW_SHEET}.csv`))
		? load(`${REVIEW_SHEET}.csv`)
		: [];
	// Both people sheets, each row tagged with where it came from
	const everyone = [
		...students.map((row) => ({ ...row, sheet: 'students' })),
		...members.map((row) => ({ ...row, sheet: 'members' }))
	];
	return { members, students, groups, everyone, review };
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
