#!/usr/bin/env node

// Sanity checks for the people / groups / projects sheets.
//
// The CSVs in src/data/ are exported from the VCSI-web SharePoint workbook by
// `npm run msgraph:fetch`, so every problem reported here should be fixed in
// the workbook, not in the CSV (the next fetch would overwrite it). Each issue
// names the sheet and the spreadsheet row so it can be found quickly.
//
//   npm run data:check            report issues, exit 0
//   npm run data:check -- --links also check that group websites respond
//   npm run data:check -- --strict exit 1 if any errors were found
//
// Errors are things that break or hide something on the site. Warnings are
// things that look wrong but render fine.

import { readFileSync, appendFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { csvParse } from 'd3-dsv';
import { statusOf, affiliationsOf, normalizeOpenAlexId } from '../src/lib/people.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'src', 'data');

const CHECK_LINKS = process.argv.includes('--links');
const STRICT = process.argv.includes('--strict');

// Values the site knows how to display. Anything else is reported.
const MEMBER_STATUSES = ['active', 'retired'];
const STUDENT_STATUSES = ['active', 'alumni', ''];
const GROUP_STATUSES = ['Core team', 'UVM affiliate'];

// Active students whose row hasn't been touched in this long get a nudge.
const STALE_AFTER_DAYS = 365;

const load = (file) => csvParse(readFileSync(join(DATA_DIR, file), 'utf8'));

const members = load('members.csv');
const students = load('students.csv');
const groups = load('groups.csv');
const projects = load('projects.csv');
const misc = load('misc.csv');
// Used by scripts/people-audit; the sheet may not exist yet
const peopleIgnore = existsSync(join(DATA_DIR, 'people-ignore.csv'))
	? load('people-ignore.csv')
	: [];

const memberIds = new Set(members.map((d) => d.id));
const studentIds = new Set(students.map((d) => d.id));
const groupIds = new Set(groups.map((d) => d.id));
const personIds = new Set([...memberIds, ...studentIds]);

/** @type {{level: 'error' | 'warning', sheet: string, row: number | null, id: string, message: string}[]} */
const issues = [];

// Row 1 of the sheet is the header, so data row i sits on sheet row i + 2.
function report(level, sheet, i, row, message) {
	issues.push({ level, sheet, row: i + 2, id: row.id || row.name || '(no id)', message });
}
const error = (...args) => report('error', ...args);
const warn = (...args) => report('warning', ...args);
// For issues about a whole sheet rather than one row
const warnSheet = (sheet, message) =>
	issues.push({ level: 'warning', sheet, row: null, id: '', message });

/** Space separated id lists, as used in PI / member columns. */
const idList = (value) => (value || '').split(/[\s,]+/).filter(Boolean);

const looksLikeUrl = (value) => /^https?:\/\/\S+$/.test(value.trim());

/** Likely intended person id for a typo like "dave-jangraw" or "sam-z". */
function suggestId(id) {
	const last = id.split('-').at(-1);
	const match = [...personIds].find(
		(known) => known.startsWith(id) || (last.length > 2 && known.split('-').at(-1) === last)
	);
	return match ? ` (did you mean "${match}"?)` : '';
}

// --------------------------------- //
// Checks shared by every sheet
// --------------------------------- //

function checkIds(sheet, rows) {
	const seen = new Map();
	rows.forEach((row, i) => {
		if (!row.id) return error(sheet, i, row, 'missing id');
		if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(row.id)) {
			warn(
				sheet,
				i,
				row,
				`id "${row.id}" should be lowercase-with-hyphens (it becomes the page URL)`
			);
		}
		if (seen.has(row.id)) {
			error(
				sheet,
				i,
				row,
				`duplicate id, also on row ${seen.get(row.id) + 2}; only the first row is used`
			);
		} else {
			seen.set(row.id, i);
		}
		if ('name' in row && !row.name?.trim()) error(sheet, i, row, 'missing name');
	});
}

function checkUrls(sheet, rows, columns) {
	rows.forEach((row, i) => {
		for (const col of columns) {
			const value = row[col]?.trim();
			if (!value) continue;
			// Several links crammed into one cell, or text in a URL column,
			// usually means the row is shifted or a cell was pasted wrong.
			if (!looksLikeUrl(value)) error(sheet, i, row, `${col} "${value}" is not a single URL`);
		}
	});
}

function checkPeopleRefs(sheet, rows, columns) {
	rows.forEach((row, i) => {
		for (const col of columns) {
			for (const id of idList(row[col])) {
				if (looksLikeUrl(id)) {
					error(sheet, i, row, `${col} contains a URL; the row is probably shifted by a column`);
				} else if (!personIds.has(id)) {
					error(
						sheet,
						i,
						row,
						`${col} lists "${id}", which is not an id in members or students${suggestId(id)}`
					);
				}
			}
		}
	});
}

// --------------------------------- //
// People
// --------------------------------- //

function checkPeople(sheet, rows, allowedStatuses) {
	checkIds(sheet, rows);
	checkUrls(sheet, rows, ['url', 'social', 'linkedin', 'bluesky', 'youtube', 'GoogleScholar']);

	rows.forEach((row, i) => {
		const status = statusOf(row);
		if (!allowedStatuses.includes(status)) {
			error(
				sheet,
				i,
				row,
				`status "${row.status}" is not one of: ${allowedStatuses.filter(Boolean).join(', ')}`
			);
		}

		if (row.openAlexId?.trim() && !/^A\d+$/.test(normalizeOpenAlexId(row.openAlexId))) {
			error(sheet, i, row, `openAlexId "${row.openAlexId}" should look like A5012345678`);
		}

		const email = row.email?.trim();
		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			error(sheet, i, row, `email "${email}" is not a valid address`);
		}
	});

	// Emails aren't shown on the site, so placeholders are one line, not one per row
	const placeholders = rows.filter((row) => /@example\./i.test(row.email || ''));
	if (placeholders.length > 0) {
		warnSheet(
			sheet,
			`${placeholders.length} placeholder @example emails: ${placeholders.map((d) => d.id).join(', ')}`
		);
	}

	// The same personal link or email on two different people is almost
	// always a copy-paste slip.
	for (const col of ['email', 'social', 'linkedin', 'url']) {
		const owners = new Map();
		rows.forEach((row, i) => {
			const value = row[col]?.trim().toLowerCase();
			if (!value || /@example\./.test(value)) return;
			// Shared pages (a department directory, say) are fine for url
			if (col === 'url' && !/linkedin|github\.io|scholar\.google/.test(value)) return;
			const prior = owners.get(value);
			if (prior && prior.row.id !== row.id) {
				warn(sheet, i, row, `${col} is the same as ${prior.row.id} (row ${prior.i + 2})`);
			} else if (!prior) {
				owners.set(value, { row, i });
			}
		});
	}
}

checkPeople('members', members, MEMBER_STATUSES);
checkPeople('students', students, STUDENT_STATUSES);

members.forEach((row, i) => {
	if (row.id !== 'vcsi' && !row.position?.trim()) {
		warn(
			'members',
			i,
			row,
			'position is empty, so the member is missing from the position filter on Who We Are'
		);
	}
});

const today = new Date();
students.forEach((row, i) => {
	if (memberIds.has(row.id)) {
		warn('students', i, row, 'also listed in members; the two rows may show different information');
	}

	const affiliations = affiliationsOf(row);
	if (affiliations.length === 0 && statusOf(row) !== 'alumni') {
		warn('students', i, row, 'no primaryAffiliation, so they appear on no group page');
	}
	for (const groupId of affiliations) {
		if (!groupIds.has(groupId)) {
			error(
				'students',
				i,
				row,
				`primaryAffiliation "${groupId}" is not a group id (see groups sheet)`
			);
		}
	}

	if (statusOf(row) === 'active' && row.lastUpdated) {
		const updated = new Date(row.lastUpdated);
		const days = (today - updated) / 86400000;
		if (Number.isNaN(days)) {
			error('students', i, row, `lastUpdated "${row.lastUpdated}" is not a date (use YYYY-MM-DD)`);
		} else if (days > STALE_AFTER_DAYS) {
			warn('students', i, row, `active, but row last updated ${row.lastUpdated}; still current?`);
		}
	}
});

// --------------------------------- //
// Groups, projects, misc
// --------------------------------- //

checkIds('groups', groups);
checkUrls('groups', groups, ['url']);
checkPeopleRefs('groups', groups, ['PI']);
const groupsByPI = new Map();
groups.forEach((row, i) => {
	for (const pi of idList(row.PI)) {
		// Some people do lead two labs, but a repeated PI is often a copied row
		if (groupsByPI.has(pi))
			warn('groups', i, row, `PI "${pi}" also leads ${groupsByPI.get(pi)}; intended?`);
		else groupsByPI.set(pi, row.id);
	}

	if (!GROUP_STATUSES.includes(row.status?.trim())) {
		error(
			'groups',
			i,
			row,
			`status "${row.status}" is not one of: ${GROUP_STATUSES.join(', ')}; the group is hidden from the Research Groups page`
		);
	}
	if (!row.url?.trim()) warn('groups', i, row, 'no url');
	if (!students.some((s) => affiliationsOf(s).includes(row.id) && statusOf(s) !== 'alumni')) {
		warn('groups', i, row, 'no current students listed in the students sheet');
	}
});

for (const [sheet, rows] of [
	['projects', projects],
	['misc', misc]
]) {
	checkIds(sheet, rows);
	checkUrls(sheet, rows, ['url']);
	checkPeopleRefs(sheet, rows, ['PI', 'member']);
}

peopleIgnore.forEach((row, i) => {
	if (!row.name?.trim()) error('people-ignore', i, row, 'missing name');
	const group = row.group?.trim();
	if (group && !groupIds.has(group)) {
		error(
			'people-ignore',
			i,
			row,
			`group "${group}" is not a group id; leave it empty to skip this name for every group`
		);
	}
});

// --------------------------------- //
// Optional: are group websites up?
// --------------------------------- //

if (CHECK_LINKS) {
	await Promise.all(
		groups.map(async (row, i) => {
			const url = row.url?.trim();
			if (!url || !looksLikeUrl(url)) return;
			try {
				const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
				if (!res.ok) warn('groups', i, row, `url responds ${res.status} (${url})`);
			} catch (e) {
				warn('groups', i, row, `url unreachable: ${e.cause?.code || e.message} (${url})`);
			}
		})
	);
}

// --------------------------------- //
// Report
// --------------------------------- //

const sheetOrder = ['members', 'students', 'groups', 'projects', 'misc', 'people-ignore'];
issues.sort(
	(a, b) =>
		sheetOrder.indexOf(a.sheet) - sheetOrder.indexOf(b.sheet) ||
		(a.row ?? 0) - (b.row ?? 0) ||
		a.level.localeCompare(b.level)
);

const errors = issues.filter((d) => d.level === 'error').length;
const warnings = issues.length - errors;

for (const sheet of sheetOrder) {
	const own = issues.filter((d) => d.sheet === sheet);
	if (own.length === 0) continue;
	console.log(`\n${sheet} sheet`);
	for (const d of own) {
		const mark = d.level === 'error' ? '✗' : '!';
		if (d.row === null) console.log(`  ${mark} ${d.message}`);
		else console.log(`  ${mark} row ${String(d.row).padEnd(3)} ${d.id}: ${d.message}`);
	}
}
console.log(
	`\n${errors} error(s), ${warnings} warning(s). Fix these in the VCSI-web SharePoint workbook.`
);

// On GitHub Actions, also write a table to the run summary page.
if (process.env.GITHUB_STEP_SUMMARY) {
	const escape = (s) => String(s).replace(/\|/g, '\\|');
	const lines = [
		'## Data check',
		'',
		`${errors} error(s), ${warnings} warning(s). Fix these in the VCSI-web SharePoint workbook.`,
		''
	];
	if (issues.length > 0) {
		lines.push('| | Sheet | Row | Id | Issue |', '|---|---|---|---|---|');
		for (const d of issues) {
			lines.push(
				`| ${d.level === 'error' ? '❌' : '⚠️'} | ${d.sheet} | ${d.row ?? ''} | ${escape(d.id)} | ${escape(d.message)} |`
			);
		}
	}
	appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join('\n') + '\n');
}

if (STRICT && errors > 0) process.exit(1);
