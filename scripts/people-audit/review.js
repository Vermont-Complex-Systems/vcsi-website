#!/usr/bin/env node

// Go through the proposals from people:resolve, one person at a time, and
// record a decision for each. Run by the person curating the site, before
// anything is shown to PIs.
//
//   npm run people:review                  undecided proposals (runs people:resolve first)
//   npm run people:review -- --all         also revisit ones already decided
//   npm run people:review -- --sheet       publish proposals + decisions as the
//                                          people-review sheet in SharePoint
//
// Decisions:
//   yes     right: apply it
//   hide    right person, but not shown on the site (added with show = 0,
//           e.g. a visiting student who isn't part of VCSI)
//   no      wrong (not current, not the same person, ...); don't ask again
//   ask PI  needs the lab's PI; these are what we send them
// The review is about getting the people right. Whether someone appears on
// the site is the show column in SharePoint.
// Each answer is saved straight away to people-decisions.csv (gitignored), so
// you can quit and pick up later.

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline/promises';
import { csvParse, csvFormatRows } from 'd3-dsv';
import { DECISIONS_FILE, DECISION_COLUMNS, REVIEW_SHEET } from './load.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const RESOLVED = join(ROOT, 'people-resolved.csv');

if (!existsSync(RESOLVED)) {
	console.error('No people-resolved.csv yet; run npm run people:resolve first.');
	process.exit(1);
}
const proposals = csvParse(readFileSync(RESOLVED, 'utf8'));
const columns = proposals.columns;

// --------------------------------- //
// Publish
// --------------------------------- //

if (process.argv.includes('--sheet')) {
	const { replaceSheet } = await import('./sharepoint.js');
	const table = [columns, ...proposals.map((p) => columns.map((c) => p[c] ?? ''))];
	console.log(`Written to ${await replaceSheet(REVIEW_SHEET, table)}`);
	process.exit(0);
}

// --------------------------------- //
// Review
// --------------------------------- //

const saved = existsSync(DECISIONS_FILE) ? csvParse(readFileSync(DECISIONS_FILE, 'utf8')) : [];
const keyOf = (r) => `${r.id}|${r.action}`;
const byKey = new Map(saved.map((r) => [keyOf(r), r]));

function save(proposal, decision, note) {
	const row = {
		id: proposal.id,
		name: proposal.name,
		action: proposal.action,
		decision,
		note,
		decided: new Date().toISOString().slice(0, 10)
	};
	byKey.set(keyOf(row), row);
	const rows = [...byKey.values()];
	writeFileSync(
		DECISIONS_FILE,
		csvFormatRows([DECISION_COLUMNS, ...rows.map((r) => DECISION_COLUMNS.map((c) => r[c] ?? ''))]) +
			'\n'
	);
}

const todo = proposals.filter((p) => process.argv.includes('--all') || !p.decision);
if (todo.length === 0) {
	console.log('Nothing waiting for a decision. (--all to revisit decided ones)');
	process.exit(0);
}

const show = (label, value) => value && console.log(`  ${label.padEnd(10)} ${value}`);
// Read answers line by line (rl.question drops lines typed or piped ahead)
const rl = createInterface({ input: process.stdin });
const lines = rl[Symbol.asyncIterator]();
async function ask(prompt) {
	process.stdout.write(prompt);
	const { value, done } = await lines.next();
	return done ? null : value; // null: input ended
}
const CHOICES = { y: 'yes', h: 'hide', n: 'no', a: 'ask PI' };

console.log(
	`${todo.length} to go. y = yes, h = yes but hidden, n = no (wrong), a = ask PI, s = skip, q = quit (answers are saved as you go)\n`
);
let done = 0;
for (const [i, p] of todo.entries()) {
	console.log(`[${i + 1}/${todo.length}] ${p.action.toUpperCase()}: ${p.name}`);
	show('why', p.why);
	show('groups', p.proposed_groups);
	show('lab role', p.role_on_lab_page);
	show('ours', [p.our_status, p.our_groups].filter(Boolean).join(' | '));
	show('labs', p.lab_pages);
	show('url', p.url);
	show('photo', p.photo_url);
	if (p.decision) show('decided', `${p.decision}${p.note ? ` (${p.note})` : ''} on ${p.decided}`);

	let answer;
	while (!answer) {
		const key = ((await ask('  decision [y/h/n/a/s/q]: ')) ?? 'q').trim().toLowerCase();
		if (key === 'q') {
			rl.close();
			console.log(`\nSaved ${done} decision(s) to people-decisions.csv.`);
			process.exit(0);
		}
		if (key === 's') answer = 'skip';
		else if (CHOICES[key]) answer = CHOICES[key];
	}
	if (answer !== 'skip') {
		const note = ((await ask('  note (optional): ')) ?? '').trim();
		save(p, answer, note);
		done++;
	}
	console.log('');
}
rl.close();
console.log(
	`Saved ${done} decision(s) to people-decisions.csv. Run npm run people:resolve to refresh, then --sheet to publish.`
);
