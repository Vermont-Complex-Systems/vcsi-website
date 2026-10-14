#!/usr/bin/env node

// One row per person who needs a decision, after reconciling the lab pages
// with our sheets. This is the streamlined list to review (and later to ask
// PIs about): people who already agree are left out.
//
//   npm run people:resolve                  the focus groups below
//   npm run people:resolve -- joint-lab     only the named group(s)
//
// Writes people-resolved.csv (gitignored) and prints a summary.
//
// Where crawl.js is the raw evidence (one row per person per lab page), this
// merges a person across labs and across our two sheets, and proposes one
// action. Lab membership and VCSI affiliation are different things: someone
// who moved from one lab to another (PhD in one, postdoc in another) is still
// affiliated; someone listed only as former, everywhere we look, has left.

import { writeFileSync } from 'fs';
import { csvFormatRows } from 'd3-dsv';
import { isAlumni, isShown, statusOf, uniqueById } from '../../src/lib/people.js';
import { compareNames, findMatches, slugify } from './match.js';
import { loadSheets, loadSources, runSource, groupsOf, loadDecisions } from './load.js';

// Core faculty labs we review first: Josh Bongard, Laurent Hébert-Dufresne and
// Jean-Gabriel Young, Peter Dodds and Chris Danforth, Juniper Lovato, Sam Zhang,
// Nick Cheney.
const FOCUS = [
	'mce-lab',
	'joint-lab',
	'comp-story-lab',
	'comp-ethics-lab',
	'science-and-humanity-lab',
	'neurobotics-lab'
];

// A lab page that hasn't changed in this long can't tell us who left.
const FRESH_FOR_DAYS = 180;
const OUT_FILE = 'people-resolved.csv';

// decision, note, decided come first: they're the columns people fill in
const COLUMNS = [
	'decision', // yes, no, ask PI; empty until someone decides
	'note',
	'action',
	'name',
	'id',
	'why',
	'proposed_groups',
	'role_on_lab_page',
	'our_sheet',
	'our_status',
	'our_groups',
	'lab_pages',
	'email',
	'url',
	'photo_url',
	'decided'
];

const ACTION_ORDER = [
	'add',
	'reactivate?',
	'add group',
	'remove group',
	'mark alumni',
	'end affiliation?',
	'not on lab page',
	'same person?'
];

const { groups, everyone } = loadSheets();
const args = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const focus = args.length > 0 ? args : FOCUS;
const sources = await loadSources(focus);

// --------------------------------- //
// Gather: one entry per person, across labs and sheets
// --------------------------------- //

/** @type {Map<string, {name: string, rows: object[], possible: object[], labs: Map<string, object>}>} */
const people = new Map();
const freshGroups = new Set();
const problems = [];

function entryFor(person) {
	const { level, rows } = findMatches(person.name, everyone);
	if (level === 'same') {
		// Every sheet row with this name is the same person (e.g. a members
		// row and an old students row); key them by the first id
		const key = rows[0].id;
		if (!people.has(key))
			people.set(key, { name: rows[0].name, rows, possible: [], labs: new Map() });
		return people.get(key);
	}
	// Not in our sheets: merge with the same name seen on another lab page
	for (const [key, entry] of people) {
		if (entry.rows.length === 0 && compareNames(entry.name, person.name) === 'same') return entry;
	}
	const key = slugify(person.name);
	people.set(key, {
		name: person.name,
		rows: [],
		possible: level === 'possible' ? rows : [],
		labs: new Map()
	});
	return people.get(key);
}

for (const source of sources) {
	const result = await runSource(source);
	if (result.error) {
		problems.push(`${source.group}: ${result.error}`);
		continue;
	}
	const days = result.lastChanged ? (Date.now() - result.lastChanged) / 86400000 : Infinity;
	if (days <= FRESH_FOR_DAYS) freshGroups.add(source.group);
	for (const person of result.people) {
		entryFor(person).labs.set(source.group, person);
	}
}
const crawled = new Set(
	sources.map((s) => s.group).filter((g) => !problems.some((p) => p.startsWith(g)))
);

// People our sheets list in a crawled group who aren't on its page at all
for (const row of everyone) {
	if (row.sheet !== 'students' || isAlumni(row)) continue;
	if (!groupsOf(row, groups).some((g) => crawled.has(g))) continue;
	if ([...people.values()].some((e) => e.rows.some((r) => r.id === row.id))) continue;
	people.set(row.id, { name: row.name, rows: [row], possible: [], labs: new Map() });
}

// --------------------------------- //
// Decide: one proposed action per person
// --------------------------------- //

// Adds from a page nobody has updated in a while may be people who left long ago
const staleNote = (labs) => {
	const stale = labs.filter((g) => !freshGroups.has(g));
	return stale.length > 0
		? ` (${stale.join(', ')} page not updated in ${FRESH_FOR_DAYS}+ days)`
		: '';
};

const isPostdocLike = (row) =>
	/postdoc|research(er| associate| scientist)/i.test(row.position || '');

function decide(entry) {
	const current = [...entry.labs].filter(([, p]) => p.status === 'current').map(([g]) => g);
	const former = [...entry.labs].filter(([, p]) => p.status !== 'current').map(([g]) => g);
	const students = entry.rows.filter((r) => r.sheet === 'students');
	// show = 0 only hides someone on the site; they're still current
	const activeStudents = students.filter((r) => !isAlumni(r));
	const member = entry.rows.find((r) => r.sheet === 'members');
	const memberActive = member && statusOf(member) === 'active';
	const ourGroups = [...new Set(activeStudents.flatMap((r) => groupsOf(r, groups)))];
	const page = (g) => entry.labs.get(g);

	if (entry.possible.length > 0) {
		const names = entry.possible.map((r) => `${r.name} (${r.id})`).join(' or ');
		return {
			action: 'same person?',
			why: `"${entry.name}" on ${current.concat(former).join(', ')} may be ${names} in our sheets`
		};
	}

	// Faculty and staff: on the site through the members sheet, whatever the lab says.
	// Postdocs and researchers there can move on, so check those.
	if (member) {
		if (!memberActive || !isPostdocLike(member)) return null;
		if (current.length > 0 || activeStudents.length > 0) return null; // still here, maybe another lab
		const freshFormer = former.filter((g) => freshGroups.has(g));
		if (freshFormer.length === 0) return null;
		const next = freshFormer.map((g) => page(g).role).join('; ');
		return {
			action: 'end affiliation?',
			why: `members sheet: active ${member.position}; listed as former on ${freshFormer.join(', ')} (${next}), current on no lab page`
		};
	}

	if (current.length > 0) {
		if (entry.rows.length === 0) {
			if (current.every((g) => page(g).staff)) return null; // staff belong in members, handled by hand
			return {
				action: 'add',
				why: `current on ${current.join(', ')}; not in our sheets${staleNote(current)}`,
				groups: current
			};
		}
		if (activeStudents.length === 0) {
			return {
				action: 'reactivate?',
				why: `current on ${current.join(', ')}, but alumni in the students sheet (lab page may be out of date)`,
				groups: current
			};
		}
		const missing = current.filter((g) => !ourGroups.includes(g));
		const left = ourGroups.filter((g) => former.includes(g) && freshGroups.has(g));
		if (missing.length > 0) {
			return {
				action: 'add group',
				why: `current on ${missing.join(', ')}, which our sheet doesn't list`,
				groups: [...new Set([...ourGroups.filter((g) => !left.includes(g)), ...current])]
			};
		}
		if (left.length > 0) {
			return {
				action: 'remove group',
				why: `former on ${left.join(', ')} but still current on ${current.join(', ')}`,
				groups: ourGroups.filter((g) => !left.includes(g))
			};
		}
		return null; // agrees
	}

	if (former.length > 0) {
		const leftHere = ourGroups.filter((g) => former.includes(g) && freshGroups.has(g));
		if (leftHere.length === 0) return null;
		const stillElsewhere = ourGroups.filter((g) => !leftHere.includes(g));
		if (stillElsewhere.length > 0) {
			return {
				action: 'remove group',
				why: `former on ${leftHere.join(', ')}; our sheet also lists ${stillElsewhere.join(', ')}`,
				groups: stillElsewhere
			};
		}
		return {
			action: 'mark alumni',
			why: `former on ${leftHere.join(', ')} (${leftHere.map((g) => page(g).role).join('; ')}), current on no lab page`
		};
	}

	// Only in our sheets
	const unlisted = ourGroups.filter((g) => crawled.has(g) && freshGroups.has(g));
	if (unlisted.length === 0) return null;
	return {
		action: 'not on lab page',
		why: `active for ${unlisted.join(', ')} in our sheet, but not on that lab page at all`
	};
}

// --------------------------------- //
// Output
// --------------------------------- //

const decisions = loadDecisions();
const rows = [];
let agree = 0;
let untracked = 0; // former lab members we never listed: not our concern
for (const [key, entry] of people) {
	const decision = decide(entry);
	if (!decision) {
		const onlyFormer =
			entry.rows.length === 0 && [...entry.labs.values()].every((p) => p.status !== 'current');
		if (onlyFormer) untracked++;
		else agree++;
		continue;
	}
	const row = entry.rows.find((r) => r.sheet === 'students') || entry.rows[0];
	const best =
		[...entry.labs.values()].find((p) => p.status === 'current') || [...entry.labs.values()][0];
	rows.push({
		action: decision.action,
		name: entry.name,
		id: row?.id || key,
		why: decision.why,
		proposed_groups: (decision.groups || []).join(', '),
		role_on_lab_page: best?.role || '',
		our_sheet: [...new Set(entry.rows.map((r) => r.sheet))].join(', '),
		our_status: uniqueById(entry.rows)
			.map(
				(r) => `${r.sheet}: ${(r.status || '').trim() || 'blank'}${isShown(r) ? '' : ' (hidden)'}`
			)
			.join('; '),
		our_groups: [...new Set(entry.rows.flatMap((r) => groupsOf(r, groups)))].join(', '),
		lab_pages: [...entry.labs]
			.map(([g, p]) => `${g}: ${p.status === 'current' ? 'current' : 'former'}`)
			.join('; '),
		email: best?.email || row?.email || '',
		url: best?.url || row?.url || '',
		photo_url: best?.photo || '',
		// A decision applies to this person and this action; if the evidence
		// changes the proposed action, it's asked again
		...decisions.get(`${row?.id || key}|${decision.action}`)
	});
}

rows.sort(
	(a, b) =>
		ACTION_ORDER.indexOf(a.action) - ACTION_ORDER.indexOf(b.action) || a.name.localeCompare(b.name)
);
writeFileSync(
	OUT_FILE,
	csvFormatRows([COLUMNS, ...rows.map((r) => COLUMNS.map((c) => r[c] ?? ''))]) + '\n'
);

console.log(`Groups: ${[...crawled].join(', ')}`);
const stale = [...crawled].filter((g) => !freshGroups.has(g));
if (stale.length > 0)
	console.log(
		`Not changed in ${FRESH_FOR_DAYS} days (no departures suggested): ${stale.join(', ')}`
	);
if (problems.length > 0) console.log(`Skipped:\n  ${problems.join('\n  ')}`);
console.log(
	`\n${agree} already agree, ${untracked} former lab members we never listed (left out); ${rows.length} need a decision:`
);
for (const action of ACTION_ORDER) {
	const own = rows.filter((r) => r.action === action);
	if (own.length > 0)
		console.log(`  ${action.padEnd(17)} ${own.length}  ${own.map((r) => r.name).join(', ')}`);
}
const open = rows.filter((r) => !r.decision).length;
console.log(`\n${rows.length - open} decided, ${open} waiting (npm run people:review)`);
console.log(`\nWritten to ${OUT_FILE}`);
