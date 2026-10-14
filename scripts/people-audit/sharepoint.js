// Writing to the VCSI-web SharePoint site. Crawls only ever write to their
// own sheets and folders, never to ones the site is built from:
//   replaceSheet      the people-review sheet (`npm run people:review -- --sheet`)
//                     and the crawled-people comparison sheet (`npm run people:crawl -- --sheet`)
//   uploadNew         crawled photos into assets/headshots/students-crawl
//                     (`npm run people:crawl -- --upload`), never replacing a file
//                     that's there, so photos people swapped in by hand stay
// The one exception is applying decisions a person made in `people:review`:
//   seedSheet         students-curated, created once as a copy of students
//   applyToSiteSheet  approved changes to students-curated / members (`npm run people:apply`)
//   publishPhotos     approved photos from students-crawl to the site's folder

import 'dotenv/config';
import { readFileSync } from 'fs';
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';
import settings from '../../src/appSettings.js';
import { CURATED_SHEET } from './load.js';

// Same naming rule as fetch-msgraph.js, which turns sheet "Students" into students.csv
const sanitize = (name) => name.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();

// Sheets the site reads (src/data/<name>.csv). Edited by people only.
const SITE_SHEETS = [
	'students',
	'members',
	'groups',
	'projects',
	'misc',
	'events',
	'course-urls',
	'electives'
];

function refuseSiteSheet(name) {
	if (SITE_SHEETS.includes(sanitize(name))) {
		throw new Error(
			`"${name}" is site data and is only edited by hand; scripts never write to it.`
		);
	}
}

// The site's own headshots, synced into static/ by fetch-assets.js
const SITE_FOLDERS = ['assets/headshots/students'];

function columnLetter(index) {
	let letters = '';
	for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26)) {
		letters = String.fromCharCode(65 + ((n - 1) % 26)) + letters;
	}
	return letters;
}

function createClient() {
	const credential = new ClientSecretCredential(
		settings.tenantId,
		settings.clientId,
		settings.clientSecret
	);
	return Client.initWithMiddleware({
		authProvider: new TokenCredentialAuthenticationProvider(credential, {
			scopes: settings.scopes
		})
	});
}

/** The site's document library, as used by fetch-msgraph.js and fetch-assets.js. */
async function getDriveId(client) {
	const site = await client.api(`/sites/${settings.siteId}`).get();
	return (await client.api(`/sites/${site.id}/drives`).get()).value[0].id;
}

/** The workbook holding the students sheet, wherever it lives in the site's root folder. */
async function findWorkbook(client) {
	const driveId = await getDriveId(client);
	const items = await client.api(`/drives/${driveId}/root/children`).get();
	for (const file of items.value.filter((i) => /\.xls[xm]?$/i.test(i.name || ''))) {
		const base = `/drives/${driveId}/items/${file.id}/workbook/worksheets`;
		const sheets = (await client.api(base).get()).value;
		if (sheets.some((s) => sanitize(s.name) === 'students')) {
			return { base, fileName: file.name, sheets };
		}
	}
	throw new Error('No workbook with a "students" worksheet found in the VCSI-web SharePoint site');
}

/**
 * Create a worksheet, or replace the contents of one this script made before.
 * Refuses to touch an existing sheet whose header row differs, so it can't
 * overwrite a hand-maintained sheet by accident.
 * @param {string} name
 * @param {string[][]} table header row first
 * @returns {Promise<string>} label of the sheet written
 */
export async function replaceSheet(name, table) {
	refuseSiteSheet(name);
	const client = createClient();
	const { base, fileName, sheets } = await findWorkbook(client);
	let sheet = sheets.find((s) => s.name === name);

	if (sheet) {
		const used = await client.api(`${base}/${sheet.id}/usedRange(valuesOnly=true)`).get();
		const header = used.values[0] || [];
		const empty = used.values.every((r) => r.every((v) => v === ''));
		// Our own sheet from an earlier run starts with the same columns, even
		// if columns were added since
		const ours = table[0].slice(0, 3).every((col, i) => header[i] === col);
		if (!empty && !ours) {
			throw new Error(
				`${fileName} › ${name} exists with different columns; not overwriting it. Rename or delete it first.`
			);
		}
		await client
			.api(`${base}/${sheet.id}/range(address='${used.address.split('!')[1]}')/clear`)
			.post({
				applyTo: 'Contents'
			});
	} else {
		sheet = await client.api(`${base}/add`).post({ name });
	}

	const to = columnLetter(table[0].length - 1);
	await client
		.api(`${base}/${sheet.id}/range(address='A1:${to}${table.length}')`)
		.patch({ values: table });
	return `${fileName} › ${name}`;
}

/**
 * Upload files into a SharePoint folder, creating it if needed. A file that
 * already exists is left alone (Graph's conflictBehavior=fail), so edits made
 * in SharePoint win over the crawl.
 * @param {string} folder path in the document library, e.g. assets/headshots/students-crawl
 * @param {{name: string, path: string}[]} files name in SharePoint, local path
 * @returns {Promise<{uploaded: string[], kept: string[], failed: string[]}>}
 */
export async function uploadNew(folder, files) {
	folder = folder.replace(/^\/+|\/+$/g, '');
	if (SITE_FOLDERS.includes(folder)) {
		throw new Error(`"${folder}" holds the site's photos and is only edited by hand.`);
	}
	const client = createClient();
	const driveId = await getDriveId(client);

	try {
		await client.api(`/drives/${driveId}/root:/${folder}`).get();
	} catch (e) {
		if (e.statusCode !== 404) throw e;
		const parent = folder.split('/').slice(0, -1).join('/');
		await client
			.api(
				parent ? `/drives/${driveId}/root:/${parent}:/children` : `/drives/${driveId}/root/children`
			)
			.post({ name: folder.split('/').at(-1), folder: {} });
	}

	const uploaded = [];
	const kept = [];
	const failed = [];
	for (const file of files) {
		try {
			await client
				.api(`/drives/${driveId}/root:/${folder}/${encodeURIComponent(file.name)}:/content`)
				.query({ '@microsoft.graph.conflictBehavior': 'fail' })
				.header('Content-Type', 'image/jpeg')
				.put(readFileSync(file.path));
			uploaded.push(file.name);
		} catch (e) {
			if (e.statusCode === 409) kept.push(file.name);
			else failed.push(`${file.name} (${e.message})`);
		}
	}
	return { uploaded, kept, failed };
}

/**
 * Read-only: a sheet's header and rows, each row tagged with its sheet row
 * number (_row, 1-based as in Excel).
 * @param {string} name
 */
export async function readSheet(name) {
	const client = createClient();
	const { base, fileName, sheets } = await findWorkbook(client);
	const sheet = sheets.find((s) => sanitize(s.name) === sanitize(name));
	if (!sheet) throw new Error(`${fileName} has no "${name}" sheet`);
	const used = await client.api(`${base}/${sheet.id}/usedRange(valuesOnly=true)`).get();
	const [header, ...values] = used.values;
	const rows = values.map((r, i) => ({
		...Object.fromEntries(header.map((col, j) => [col, String(r[j] ?? '')])),
		_row: used.rowIndex + i + 2
	}));
	return { label: `${fileName} › ${sheet.name}`, header, rows };
}

/**
 * Create `name` as a copy of `from` (values and number formats, at the same
 * address) if it doesn't exist yet. Never touches an existing sheet.
 * @returns {Promise<boolean>} whether it was created now
 */
export async function seedSheet(name, from) {
	const client = createClient();
	const { base, sheets } = await findWorkbook(client);
	if (sheets.some((s) => sanitize(s.name) === sanitize(name))) return false;
	const source = sheets.find((s) => sanitize(s.name) === sanitize(from));
	const used = await client.api(`${base}/${source.id}/usedRange`).get();
	const sheet = await client.api(`${base}/add`).post({ name });
	await client
		.api(`${base}/${sheet.id}/range(address='${used.address.split('!')[1]}')`)
		.patch({ values: used.values, numberFormat: used.numberFormat });
	return true;
}

/**
 * Apply changes a person approved (in `people:review`) to a site sheet. Every
 * cell is re-read just before writing and only changed if `expect` accepts
 * its current value, so edits made in SharePoint meanwhile are never
 * overwritten; a cell already at the new value counts as done.
 * @param {string} name students or members
 * @param {{
 *   addColumns?: string[],
 *   cells?: {row: number, column: string, expect: (current: string) => boolean, value: string, label: string}[],
 *   append?: Record<string, string>[]
 * }} changes
 * @returns {Promise<{done: string[], skipped: string[]}>}
 */
export async function applyToSiteSheet(name, { addColumns = [], cells = [], append = [] }) {
	// students is kept unchanged as the reference copy of what we had
	if (sanitize(name) === 'students') {
		throw new Error('The students sheet is kept as a reference and is never edited by scripts.');
	}
	if (![CURATED_SHEET, 'members'].includes(sanitize(name))) {
		throw new Error(`applyToSiteSheet only edits ${CURATED_SHEET} and members, not "${name}"`);
	}
	const client = createClient();
	const { base, sheets } = await findWorkbook(client);
	const sheet = sheets.find((s) => sanitize(s.name) === sanitize(name));
	const path = `${base}/${sheet.id}`;
	const used = await client.api(`${path}/usedRange(valuesOnly=true)`).get();
	const header = [...used.values[0]];
	const col = (column) => columnLetter(used.columnIndex + header.indexOf(column));
	const done = [];
	const skipped = [];

	for (const column of addColumns.filter((c) => !header.includes(c))) {
		header.push(column);
		await client
			.api(`${path}/range(address='${col(column)}${used.rowIndex + 1}')`)
			.patch({ values: [[column]] });
		done.push(`added column "${column}"`);
	}

	for (const cell of cells) {
		const range = `${path}/range(address='${col(cell.column)}${cell.row}')`;
		const now = String((await client.api(range).get()).values[0][0] ?? '').trim();
		if (now === cell.value) {
			done.push(`${cell.label} (already done)`);
		} else if (!cell.expect(now)) {
			skipped.push(`${cell.label}: now "${now}", changed since the review; left as is`);
		} else {
			await client.api(range).patch({ values: [[cell.value]] });
			done.push(cell.label);
		}
	}

	if (append.length > 0) {
		const firstRow = used.rowIndex + used.values.length + 1; // 1-based, just below the data
		const from = columnLetter(used.columnIndex);
		const to = columnLetter(used.columnIndex + header.length - 1);
		await client
			.api(`${path}/range(address='${from}${firstRow}:${to}${firstRow + append.length - 1}')`)
			.patch({ values: append.map((row) => header.map((c) => row[c] ?? '')) });
		done.push(...append.map((row) => `added ${row.name}`));
	}
	return { done, skipped };
}

/**
 * Copy approved photos from the review folder into the site's headshots
 * folder, never replacing a photo already there.
 * @param {string[]} names file names, e.g. jack-diorio.jpg
 */
export async function publishPhotos(names, from = 'assets/headshots/students-crawl') {
	const to = SITE_FOLDERS[0];
	const client = createClient();
	const driveId = await getDriveId(client);
	const published = [];
	const kept = [];
	const missing = [];
	for (const name of names) {
		let content;
		try {
			content = await client
				.api(`/drives/${driveId}/root:/${from}/${encodeURIComponent(name)}:/content`)
				.responseType('arraybuffer')
				.get();
		} catch {
			missing.push(name);
			continue;
		}
		try {
			await client
				.api(`/drives/${driveId}/root:/${to}/${encodeURIComponent(name)}:/content`)
				.query({ '@microsoft.graph.conflictBehavior': 'fail' })
				.header('Content-Type', 'image/jpeg')
				.put(Buffer.from(content));
			published.push(name);
		} catch (e) {
			if (e.statusCode === 409) kept.push(name);
			else throw e;
		}
	}
	return { published, kept, missing };
}
