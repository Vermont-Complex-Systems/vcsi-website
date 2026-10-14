#!/usr/bin/env node

// Apply the decisions made in `npm run people:review`: student changes go to
// the students-curated sheet (created on first --write as a copy of
// students, which is kept unchanged as a reference), member changes to the
// members sheet. Only what a person approved.
//
//   npm run people:apply                 dry run: list every change
//   npm run people:apply -- --write      make them
//   ... --write --photos                 also copy approved photos into the site's
//                                        headshots folder (when switching the site over)
//
// yes   apply the proposal; new people get their photo copied from the review
//       folder into the site's headshots folder
// hide  add the person with show = 0 (adds the show column if missing)
// Each cell is re-checked just before writing (see applyToSiteSheet), so an
// edit made in SharePoint since the review wins. Running it twice is harmless.

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { csvParse } from 'd3-dsv';
import { affiliationsOf, isAlumni, statusOf } from '../../src/lib/people.js';
import { compareNames, findMatches } from './match.js';
import { CURATED_SHEET } from './load.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const RESOLVED = join(ROOT, 'people-resolved.csv');
const WRITE = process.argv.includes('--write');
// Copy approved photos into the site's own headshots folder. Only when
// switching the site over to students-curated; until then they stay in the
// review folder (assets/headshots/students-crawl).
const PHOTOS = process.argv.includes('--photos');
const today = new Date().toISOString().slice(0, 10);

if (!existsSync(RESOLVED)) {
	console.error('No people-resolved.csv yet; run npm run people:resolve first.');
	process.exit(1);
}
const approved = csvParse(readFileSync(RESOLVED, 'utf8')).filter((r) =>
	['yes', 'hide'].includes(r.decision)
);
if (approved.length === 0) {
	console.log('No approved decisions to apply.');
	process.exit(0);
}

const { readSheet, seedSheet, applyToSiteSheet, publishPhotos } = await import('./sharepoint.js');
// Where each kind of change is written
const TARGET = { students: CURATED_SHEET, members: 'members' };
// Until the curated sheet exists, plan against students: the copy is identical
const curated = await readSheet(CURATED_SHEET).catch(() => null);
const sheets = {
	students: curated || (await readSheet('students')),
	members: await readSheet('members')
};
const plan = {
	students: { addColumns: [], cells: [], append: [] },
	members: { addColumns: [], cells: [], append: [] }
};
const photos = [];
const notes = [];

// "PhD student (2022 - present)." -> "PhD student": the site shows this on cards
const cleanPosition = (role) => {
	const text = role
		.replace(/\s*\(\s*(\d{4}\s*-+\s*(present|\d{2,4})?|present)\s*\)\s*\.?$/i, '')
		.replace(/\.$/, '')
		.trim();
	return text.charAt(0).toUpperCase() + text.slice(1);
};

const sameGroups = (a, b) => [...a].sort().join(',') === [...b].sort().join(',');
const listOf = (value) => affiliationsOf({ primaryAffiliation: value });

/** Queue a cell change on the row with this id. */
function change(sheet, id, column, expect, value) {
	const row = sheets[sheet].rows.find((r) => r.id.trim() === id);
	if (!row) return notes.push(`${id}: no row in ${sheet}, change it by hand`);
	plan[sheet].cells.push({
		row: row._row,
		column,
		expect,
		value,
		label: `${TARGET[sheet]} row ${row._row} (${id}) ${column}: "${row[column] ?? ''}" -> "${value}"`
	});
}

for (const r of approved) {
	switch (r.action) {
		case 'add': {
			if (findMatches(r.name, sheets.students.rows).level) {
				notes.push(`${r.name}: already in students`);
				break;
			}
			plan.students.append.push({
				id: r.id,
				name: r.name,
				position: cleanPosition(r.role_on_lab_page),
				status: 'active',
				primaryAffiliation: r.proposed_groups,
				email: r.email,
				url: r.url,
				lastUpdated: today,
				show: r.decision === 'hide' ? '0' : ''
			});
			if (r.decision === 'hide') plan.students.addColumns = ['show'];
			else if (r.photo_url) photos.push(`${r.id}.jpg`);
			break;
		}
		case 'reactivate?':
			change('students', r.id, 'status', (now) => isAlumni({ status: now }), 'active');
			break;
		case 'add group':
		case 'remove group':
			change(
				'students',
				r.id,
				'primaryAffiliation',
				(now) => sameGroups(listOf(now), listOf(r.our_groups)),
				r.proposed_groups
			);
			break;
		case 'mark alumni':
			change(
				'students',
				r.id,
				'status',
				(now) => ['active', ''].includes(statusOf({ status: now })),
				'alumni'
			);
			break;
		case 'end affiliation?':
			change('members', r.id, 'status', (now) => statusOf({ status: now }) === 'active', 'retired');
			break;
		case 'same person?': {
			// Our row is the near match by name. The lab's own spelling wins; ids
			// don't change, so links keep working.
			let found = false;
			for (const sheet of ['students', 'members']) {
				for (const row of sheets[sheet].rows.filter(
					(row) => compareNames(r.name, row.name) === 'possible'
				)) {
					change(sheet, row.id.trim(), 'name', (now) => now === row.name.trim(), r.name);
					found = true;
				}
			}
			if (!found) notes.push(`${r.name}: no near match left in the sheets, check by hand`);
			break;
		}
		default:
			notes.push(`${r.name}: "${r.action}" isn't applied automatically, change it by hand`);
	}
}

// --------------------------------- //
// Show, then (with --write) apply
// --------------------------------- //

for (const [sheet, p] of Object.entries(plan)) {
	if (p.addColumns.length + p.cells.length + p.append.length === 0) continue;
	console.log(
		sheet === 'students' && !curated
			? `\n${CURATED_SHEET} (to be created as a copy of students)`
			: `\n${sheets[sheet].label}`
	);
	for (const c of p.addColumns.filter((c) => !sheets[sheet].header.includes(c))) {
		console.log(`  + column "${c}" (blank = shown, 0 = hidden)`);
	}
	for (const c of p.cells) console.log(`  ~ ${c.label}`);
	for (const row of p.append) {
		console.log(
			`  + ${row.name} | ${row.position} | ${row.primaryAffiliation}${row.show === '0' ? ' | hidden' : ''}`
		);
	}
}
if (photos.length > 0) {
	console.log(
		PHOTOS
			? `\nPhotos to copy into assets/headshots/students: ${photos.join(', ')}`
			: `\n${photos.length} approved photos stay in assets/headshots/students-crawl (--photos copies them to the site's folder)`
	);
}
if (notes.length > 0) console.log(`\nNot applied:\n  ${notes.join('\n  ')}`);

if (!WRITE) {
	console.log('\nDry run. Run with --write to make these changes.');
	process.exit(0);
}

console.log('\nApplying...');
if (!curated && (await seedSheet(CURATED_SHEET, 'students'))) {
	console.log(`Created ${CURATED_SHEET} as a copy of students`);
}
for (const [sheet, p] of Object.entries(plan)) {
	if (p.addColumns.length + p.cells.length + p.append.length === 0) continue;
	const { done, skipped } = await applyToSiteSheet(TARGET[sheet], p);
	console.log(`${TARGET[sheet]}: ${done.length} done, ${skipped.length} skipped`);
	for (const s of skipped) console.log(`  skipped: ${s}`);
}
if (PHOTOS && photos.length > 0) {
	const { published, kept, missing } = await publishPhotos(photos);
	console.log(
		`Photos: ${published.length} copied, ${kept.length} already there, ${missing.length} not in the review folder`
	);
}
console.log('\nDone. Run npm run msgraph:fetch to pull the changes into src/data/.');
