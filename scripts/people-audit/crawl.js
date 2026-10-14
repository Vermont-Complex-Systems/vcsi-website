#!/usr/bin/env node

// Everyone listed on the group websites, side by side with our sheets.
//
//   npm run people:crawl                         print a summary, write people-crawl.csv
//   npm run people:crawl -- --sheet              also write it to the "crawled-people"
//                                                worksheet in the SharePoint workbook
//   npm run people:crawl -- --photos             also download current members' photos
//                                                to crawled-photos/<group>/<id>.jpg
//   npm run people:crawl -- --upload             --photos, then upload the ones the site
//                                                lacks to SharePoint (REVIEW_PHOTOS)
//
// Where the audit (index.js) gives suggestions, this is the raw comparison:
// one row per person per group, from the lab page, from our sheets, or both.
// Handy for checking the scrapers and for seeing what manual curation added.

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { csvFormatRows } from 'd3-dsv';
import sharp from 'sharp';
import { affiliationsOf, belongsTo, isAlumni, isShown, uniqueById } from '../../src/lib/people.js';
import { findMatches, slugify } from './match.js';
import { loadSheets, loadSources, runSource } from './load.js';

const SHEET_NAME = 'crawled-people';
const OUT_FILE = 'people-crawl.csv';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
// Photos from lab pages are for review only: kept out of static/ (so never
// deployed) and out of git. Approved ones go to the SharePoint headshots folder.
const PHOTO_DIR = join(ROOT, 'crawled-photos');
const SITE_PHOTOS = join(ROOT, 'static', 'common', 'assets', 'students');
const PHOTO_SIZE = 400; // square, like the 200px headshots on the site but with room to spare
// Review folder in SharePoint, next to the site's assets/headshots/students.
// Files people put or replace there are never overwritten by the crawl.
const REVIEW_PHOTOS = 'assets/headshots/students-crawl';

const UPLOAD = process.argv.includes('--upload');
const PHOTOS = UPLOAD || process.argv.includes('--photos');

const COLUMNS = [
	'group',
	'name',
	'comparison', // see compare() below
	'on_lab_page', // current, former, or not listed
	'role_on_lab_page',
	'our_id',
	'our_sheet', // students, members, or empty
	'our_status', // e.g. active, alumni, active (hidden)
	'our_groups',
	'name_match', // same, possible, or empty
	'person_url',
	'email',
	'photo_url',
	'photo_file', // in crawled-photos/, after --photos
	'our_photo', // yes if the site already has a headshot for our_id
	'source',
	'source_last_changed',
	'crawled'
];

const { students, groups, everyone } = loadSheets();
const sources = await loadSources(process.argv.slice(2).filter((a) => !a.startsWith('-')));
const today = new Date().toISOString().slice(0, 10);

// Students list their groups; members (faculty, staff) lead them via the
// groups sheet's PI column. A members row's primaryAffiliation is an institution.
const groupsOf = (row) =>
	row.sheet === 'members'
		? groups.filter((g) => (g.PI || '').split(/\s+/).includes(row.id)).map((g) => g.id)
		: affiliationsOf(row);

/** One word for filtering in Excel. */
function compare(onPage, row, group) {
	if (!row) return onPage === 'current' ? 'missing from ours' : 'former, not in ours';
	if (row.sheet === 'members') return 'in members';
	const here = belongsTo(row, group);
	if (onPage === 'not listed') return 'only in ours';
	if (onPage === 'current') {
		if (!here) return 'other group in ours';
		return isAlumni(row) ? 'differs' : 'agrees';
	}
	return here && !isAlumni(row) ? 'differs' : 'agrees';
}

const hasSitePhoto = (id) =>
	Boolean(id) && ['jpg', 'png'].some((ext) => existsSync(join(SITE_PHOTOS, `${id}.${ext}`)));

/** Download, square-crop around the face (sharp's attention strategy) and save as jpg. */
async function savePhoto(url, file) {
	const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
	if (!res.ok) throw new Error(`responded ${res.status}`);
	mkdirSync(dirname(file), { recursive: true });
	await sharp(Buffer.from(await res.arrayBuffer()))
		.rotate() // respect EXIF orientation
		.resize(PHOTO_SIZE, PHOTO_SIZE, { fit: 'cover', position: sharp.strategy.attention })
		.jpeg({ quality: 85 })
		.toFile(file);
}

function ourStatus(row) {
	if (!row) return '';
	const status = (row.status || '').trim() || 'blank';
	return isShown(row) ? status : `${status} (hidden)`;
}

const rows = [];
const problems = [];

for (const source of sources) {
	const result = await runSource(source);
	if (result.error) {
		problems.push(`${source.group}: ${result.error}`);
		continue;
	}
	const lastChanged = result.lastChanged ? result.lastChanged.toISOString().slice(0, 10) : '';
	const seen = new Set();

	for (const person of result.people) {
		const onPage = person.status === 'current' ? 'current' : 'former';
		const { level, rows: matches } = findMatches(person.name, everyone);
		// Prefer the row for this group, then members (they're on the site
		// regardless of group), then any students row
		const row =
			matches.find((r) => groupsOf(r).includes(source.group)) ||
			matches.find((r) => r.sheet === 'members') ||
			matches[0];
		matches.forEach((r) => seen.add(r.id));

		rows.push({
			group: source.group,
			name: person.name,
			comparison: level === 'possible' ? 'same person?' : compare(onPage, row, source.group),
			on_lab_page: onPage,
			role_on_lab_page: person.role,
			our_id: row?.id || '',
			our_sheet: row?.sheet || '',
			our_status: ourStatus(row),
			our_groups: row ? groupsOf(row).join(', ') : '',
			name_match: level || '',
			person_url: person.url || '',
			email: person.email || '',
			photo_url: person.photo || '',
			// Named like the site's headshots, so an approved one can be used as is
			photo_file:
				person.photo && onPage === 'current'
					? `${source.group}/${row?.id || slugify(person.name)}.jpg`
					: '',
			our_photo: hasSitePhoto(row?.id) ? 'yes' : '',
			source: source.url,
			source_last_changed: lastChanged,
			crawled: today
		});
	}

	// People we list for this group who aren't on the page at all
	for (const s of uniqueById(students.filter((s) => belongsTo(s, source.group)))) {
		if (seen.has(s.id)) continue;
		rows.push({
			group: source.group,
			name: s.name,
			comparison: compare('not listed', s, source.group),
			on_lab_page: 'not listed',
			our_id: s.id,
			our_sheet: 'students',
			our_status: ourStatus(s),
			our_groups: groupsOf({ ...s, sheet: 'students' }).join(', '),
			our_photo: hasSitePhoto(s.id) ? 'yes' : '',
			source: source.url,
			source_last_changed: lastChanged,
			crawled: today
		});
	}
}

if (PHOTOS) {
	const wanted = rows.filter((r) => r.photo_file);
	let saved = 0;
	const failed = [];
	// A few at a time, to be polite to the lab sites
	for (let i = 0; i < wanted.length; i += 4) {
		await Promise.all(
			wanted.slice(i, i + 4).map(async (r) => {
				const file = join(PHOTO_DIR, r.photo_file);
				if (existsSync(file)) return; // delete the folder to re-download
				try {
					await savePhoto(r.photo_url, file);
					saved++;
				} catch (e) {
					failed.push(`${r.name} (${e.message})`);
					r.photo_file = '';
				}
			})
		);
	}
	console.log(
		`Photos: ${saved} downloaded to crawled-photos/, ${wanted.length - saved - failed.length} already there`
	);
	if (failed.length > 0) console.log(`  failed: ${failed.join('; ')}`);
}

// Only point at photos that are actually on disk
for (const r of rows) {
	if (r.photo_file && !existsSync(join(PHOTO_DIR, r.photo_file))) r.photo_file = '';
}

if (UPLOAD) {
	// Only people the site has no headshot for, one file per id (a person on
	// two lab pages keeps the first photo found)
	const files = new Map();
	for (const r of rows) {
		const name = r.photo_file?.split('/').at(-1);
		if (name && !r.our_photo && !files.has(name)) {
			files.set(name, { name, path: join(PHOTO_DIR, r.photo_file) });
		}
	}
	const { uploadNew } = await import('./sharepoint.js');
	const { uploaded, kept, failed } = await uploadNew(REVIEW_PHOTOS, [...files.values()]);
	console.log(
		`SharePoint ${REVIEW_PHOTOS}: ${uploaded.length} uploaded, ${kept.length} already there (left as is)`
	);
	if (failed.length > 0) console.log(`  failed: ${failed.join('; ')}`);
}

const table = [COLUMNS, ...rows.map((r) => COLUMNS.map((c) => r[c] ?? ''))];
writeFileSync(OUT_FILE, csvFormatRows(table) + '\n');

// Summary: one line per group
const crawled = new Set(rows.map((r) => r.group));
for (const g of groups) {
	if (!crawled.has(g.id)) continue;
	const own = rows.filter((r) => r.group === g.id);
	const count = (c) => own.filter((r) => r.comparison === c).length;
	console.log(
		`${g.id.padEnd(26)} agrees ${count('agrees')}, missing from ours ${count('missing from ours')}, differs ${count('differs')}, only in ours ${count('only in ours')}, same person? ${count('same person?')}`
	);
}
const uncovered = groups.filter((g) => !sources.some((s) => s.group === g.id)).map((g) => g.id);
if (uncovered.length > 0) console.log(`\nNo scraper: ${uncovered.join(', ')}`);
if (problems.length > 0) console.log(`\nSkipped:\n  ${problems.join('\n  ')}`);
console.log(`\n${rows.length} rows written to ${OUT_FILE}`);

if (process.argv.includes('--sheet')) {
	const { replaceSheet } = await import('./sharepoint.js');
	const label = await replaceSheet(SHEET_NAME, table);
	console.log(`Written to ${label}`);
}
