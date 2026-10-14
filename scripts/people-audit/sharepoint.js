// Writing to the VCSI-web SharePoint site. Scripts only ever write to their
// own sheets and folders, never to ones the site is built from:
//   appendRows    new people into the students-crawl review sheet
//                 (`npm run people:audit -- --write`); a person moves approved
//                 rows into students
//   replaceSheet  the crawled-people comparison sheet (`npm run people:crawl -- --sheet`)
//   uploadNew     crawled photos into assets/headshots/students-crawl
//                 (`npm run people:crawl -- --upload`), never replacing a file
//                 that's there, so photos people swapped in by hand stay

import 'dotenv/config';
import { readFileSync } from 'fs';
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';
import settings from '../../src/appSettings.js';
import { findMatches } from './match.js';

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
 * Append rows below the data of an existing sheet, matching its columns by
 * header name. Skips people already in it, so running twice adds nothing.
 * @param {string} name sheet name, e.g. students-crawl
 * @param {Record<string, string>[]} rows values keyed by column name
 * @returns {Promise<{label: string, written: string[], skipped: string[]}>}
 */
export async function appendRows(name, rows) {
	refuseSiteSheet(name);
	const client = createClient();
	const { base, fileName, sheets } = await findWorkbook(client);
	const sheet = sheets.find((s) => s.name === name);
	if (!sheet)
		throw new Error(
			`${fileName} has no "${name}" sheet. Create it first (a copy of students works).`
		);
	const path = `${base}/${sheet.id}`;
	const label = `${fileName} › ${name}`;

	const used = await client.api(`${path}/usedRange`).get();
	const [header, ...existing] = used.values;
	if (!header.includes('name')) throw new Error(`${label} has no "name" column`);

	const live = existing.map((r) =>
		Object.fromEntries(header.map((col, i) => [col, String(r[i] ?? '')]))
	);
	const written = [];
	const skipped = [];
	const toWrite = [];
	for (const row of rows) {
		if (findMatches(row.name, live).level) skipped.push(`${row.name} (already in ${name})`);
		else {
			toWrite.push(header.map((col) => row[col] ?? ''));
			written.push(row.name);
			live.push(row);
		}
	}

	if (toWrite.length > 0) {
		const firstRow = used.rowIndex + used.values.length + 1; // 1-based, just below the data
		const lastRow = firstRow + toWrite.length - 1;
		const from = columnLetter(used.columnIndex);
		const to = columnLetter(used.columnIndex + header.length - 1);
		await client
			.api(`${path}/range(address='${from}${firstRow}:${to}${lastRow}')`)
			.patch({ values: toWrite });
	}

	return { label, written, skipped };
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
