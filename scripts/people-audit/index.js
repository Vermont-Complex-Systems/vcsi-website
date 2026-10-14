#!/usr/bin/env node

// Compare group websites with the people sheets and suggest updates.
//
//   npm run people:audit                    all groups in sources/
//   npm run people:audit -- joint-lab       only the named group(s)
//   npm run people:audit -- --write         also add new people to the
//                                           students-crawl review sheet
//
// Without --write nothing is written anywhere: the output is a list of
// suggestions for a person to apply in the VCSI-web SharePoint workbook.
// Scripts never write to the students sheet itself. See README.md.

import { appendFileSync } from 'fs';
import { csvFormatRows } from 'd3-dsv';
import { affiliationsOf, belongsTo, isAlumni, isShown, uniqueById } from '../../src/lib/people.js';
import { findMatches, slugify } from './match.js';
import { loadSheets, loadSources, runSource, REVIEW_SHEET } from './load.js';

// A group page that hasn't changed in this long can't tell us who left.
const FRESH_FOR_DAYS = 180;

const { students, groups, everyone, review } = loadSheets();

const WRITE = process.argv.includes('--write');

const today = new Date().toISOString().slice(0, 10);

const sources = await loadSources(process.argv.slice(2).filter((a) => !a.startsWith('-')));

// --------------------------------- //
// Audit one group
// --------------------------------- //

/** A students-sheet row for someone new, for the review sheet. */
function newRow(person, group) {
	return {
		id: slugify(person.name),
		name: person.name,
		position: person.role.replace(/\.$/, ''),
		status: 'active',
		primaryAffiliation: group,
		email: person.email || '',
		url: person.url || '',
		lastUpdated: today
	};
}

const asCsv = (rows) =>
	csvFormatRows(rows.map((row) => students.columns.map((col) => row[col] ?? '')));

function audit(source, { lastChanged, people }) {
	const group = source.group;
	const days = lastChanged ? Math.floor((Date.now() - lastChanged) / 86400000) : null;
	const fresh = days !== null && days <= FRESH_FOR_DAYS;

	const add = [];
	const update = [];
	const confirm = [];
	const gone = [];
	const seenIds = new Set();
	let inReview = 0;

	for (const person of people) {
		const { level, rows } = findMatches(person.name, everyone);
		rows.forEach((row) => seenIds.add(row.id));

		if (level === 'possible') {
			const names = new Set(rows.map((r) => `${r.name} (${r.id})`));
			confirm.push(
				`**${person.name}** on the page — same person as ${[...names].join(' or ')} in our sheets? If so, correct the name on one side.`
			);
			continue;
		}

		const matched = {
			students: rows.filter((r) => r.sheet === 'students'),
			members: rows.filter((r) => r.sheet === 'members')
		};
		// show = 0 is a decision someone already made (or is waiting on the PI)
		if (
			matched.members.length === 0 &&
			matched.students.length > 0 &&
			!matched.students.some(isShown)
		) {
			continue;
		}
		const inGroup = matched.students.filter((s) => belongsTo(s, group));
		const currentHere = inGroup.some((s) => !isAlumni(s));
		const alumniHere = inGroup.some((s) => isAlumni(s));
		// Left this group but still active in another one, so still at VCSI
		const activeElsewhere = matched.students.some((s) => !isAlumni(s) && !belongsTo(s, group));

		if (person.status === 'current') {
			if (level === null) {
				if (person.staff) {
					update.push(
						`**${person.name}** is listed as staff (${person.role}) but is in neither sheet. Add to members?`
					);
				} else if (findMatches(person.name, review).level) {
					// Already in the review sheet: waiting for a decision, or declined
					inReview++;
				} else {
					add.push(newRow(person, group));
				}
			} else if (matched.members.length > 0 || currentHere) {
				// Already on the site. Members (faculty, staff) aren't tied to a group row.
			} else if (alumniHere) {
				update.push(
					`**${person.name}** is current on the page, but the students sheet has them as alumni. Change status to active?`
				);
			} else if (matched.students.length > 0) {
				const s = matched.students[0];
				update.push(
					`**${person.name}** (${s.id}) is current on the page, but their primaryAffiliation is "${affiliationsOf(s).join(', ') || 'empty'}". Add ${group}?`
				);
			}
		} else if (fresh) {
			// Only a recently updated page can tell us someone left
			if (currentHere) {
				update.push(
					`**${person.name}** is under former members on the page, but active in the students sheet. Change status to alumni?`
				);
			}
			// Faculty moving on from a lab doesn't mean leaving VCSI, but postdocs usually do
			for (const m of activeElsewhere ? [] : matched.members) {
				if (/postdoc/i.test(m.position) && m.status?.trim() === 'active') {
					update.push(
						`**${person.name}** is under former members on the page, but the members sheet lists them as an active ${m.position}. Still at VCSI?`
					);
				}
			}
		}
	}

	if (fresh) {
		const listedHere = uniqueById(
			students.filter((s) => isShown(s) && belongsTo(s, group) && !isAlumni(s))
		);
		for (const s of listedHere) {
			if (!seenIds.has(s.id)) {
				gone.push(
					`**${s.name}** (${s.id}) is active for ${group} in the students sheet but not on the page at all. Left, or never listed there?`
				);
			}
		}
	}

	const hidden = uniqueById(students.filter((s) => !isShown(s) && belongsTo(s, group)));

	return { days, fresh, add, update, confirm, gone, hidden, inReview };
}

// --------------------------------- //
// Report
// --------------------------------- //

const out = [
	`# People audit, ${today}`,
	'',
	'Suggestions only: review each one, then make the change in the VCSI-web SharePoint workbook.',
	''
];
const allNew = [];

for (const source of sources) {
	const groupName = groups.find((g) => g.id === source.group)?.name || source.group;
	out.push(`## ${groupName}`, '');

	const result = await runSource(source);
	if (result.error) {
		out.push(`Skipped: ${result.error}.`, '');
		continue;
	}

	const r = audit(source, result);
	const when = r.days === null ? 'unknown' : `${r.days} days ago`;
	out.push(
		`Source: ${source.url}, last changed ${when}${r.fresh ? '.' : `, so it is not used to suggest who left.`}`,
		''
	);

	if (r.add.length > 0) {
		allNew.push(...r.add);
		out.push(
			WRITE
				? `**New on the page.** Being added to the ${REVIEW_SHEET} sheet (see the end of this report):`
				: `**New on the page.** Add to the ${REVIEW_SHEET} sheet, then ask the PI; move approved rows into students. Rows are in sheet column order (run with --write to add them automatically):`,
			''
		);
		out.push(...r.add.map((row) => `- ${row.name}, ${row.position}`));
		if (!WRITE) out.push('', '```csv', asCsv(r.add), '```');
		out.push('');
	}
	for (const [title, items] of [
		['Sheet and page disagree', r.update],
		['Same person?', r.confirm],
		['Not on the page', r.gone]
	]) {
		if (items.length === 0) continue;
		out.push(`**${title}**`, '', ...items.map((i) => `- ${i}`), '');
	}
	if (r.add.length + r.update.length + r.confirm.length + r.gone.length === 0) {
		out.push('Nothing to update.', '');
	}
	if (r.inReview > 0) {
		out.push(
			`_${r.inReview} more on the page are already in ${REVIEW_SHEET}, waiting for a decision or declined._`,
			''
		);
	}
	if (r.hidden.length > 0) {
		out.push(`_Hidden on the site (show = 0): ${r.hidden.map((s) => s.name).join(', ')}._`, '');
	}
}

if (WRITE && allNew.length > 0) {
	const { appendRows } = await import('./sharepoint.js');
	try {
		const { label, written, skipped } = await appendRows(REVIEW_SHEET, allNew);
		out.push('## Added to the workbook', '');
		if (written.length > 0) out.push(`Added to ${label}: ${written.join(', ')}.`);
		if (skipped.length > 0) out.push(`Not added: ${skipped.join('; ')}.`);
		out.push('');
	} catch (e) {
		out.push('## Added to the workbook', '', `Nothing written: ${e.message}`, '');
		process.exitCode = 1;
	}
}

const report = out.join('\n');
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + '\n');
