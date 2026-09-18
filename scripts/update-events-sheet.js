#!/usr/bin/env node
//
// Write the Research Computing Virtual Cafe schedule into the events worksheet.
//
// The workbook is the source of truth: fetch-msgraph.js overwrites
// src/data/events.csv on every build, so edits belong here, not in the CSV.
//
// Schedule source: https://www.uvm.edu/it/research-computing-events
//
import 'dotenv/config';
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';
import settings from '../src/appSettings.js';

const EVENT_NAME = 'Research Computing Virtual Café Office Hours & Events';
const TIMES = { Thursday: '9:00 AM - 10:30 AM', Monday: '2:00 PM - 3:30 PM' };

// Fall 2026. Nov 23 is cancelled for Thanksgiving Recess.
const SESSIONS = [
  ['2026-09-10', 'Thursday'],
  ['2026-09-14', 'Monday'],
  ['2026-09-24', 'Thursday'],
  ['2026-09-28', 'Monday'],
  ['2026-10-08', 'Thursday'],
  ['2026-10-12', 'Monday'],
  ['2026-10-22', 'Thursday'],
  ['2026-10-26', 'Monday'],
  ['2026-11-05', 'Thursday'],
  ['2026-11-09', 'Monday'],
  ['2026-11-19', 'Thursday'],
  ['2026-12-03', 'Thursday'],
  ['2026-12-07', 'Monday'],
];

const toSerial = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return (Date.UTC(y, m - 1, d) - Date.UTC(1899, 11, 30)) / 86400000;
};

const credential = new ClientSecretCredential(
  settings.tenantId,
  settings.clientId,
  settings.clientSecret
);
const client = Client.initWithMiddleware({
  authProvider: new TokenCredentialAuthenticationProvider(credential, {
    scopes: settings.scopes,
  }),
});

const site = await client.api(`/sites/${settings.siteId}`).get();
const driveId = (await client.api(`/sites/${site.id}/drives`).get()).value[0].id;
const items = await client.api(`/drives/${driveId}/root/children`).get();
const file = items.value.find((i) => i.name === 'vcsi-website-data.xlsx');
const sheet = `/drives/${driveId}/items/${file.id}/workbook/worksheets/events`;

const { values } = await client.api(`${sheet}/usedRange`).get();
const found = values.map((r, i) => (r[0] === EVENT_NAME ? i + 1 : 0)).filter(Boolean);
const start = found[0];
const template = values[start - 1];

// Make room if the new schedule has more sessions than the sheet holds
const extra = SESSIONS.length - found.length;
if (extra > 0) {
  const from = start + found.length;
  await client
    .api(`${sheet}/range(address='A${from}:J${from + extra - 1}')/insert`)
    .post({ shift: 'Down' });
}

// Columns beyond the schedule (Teams link, description) are copied from the
// existing first row rather than retyped here
const rows = SESSIONS.map(([iso, day], i) => [
  EVENT_NAME,
  day,
  toSerial(iso),
  TIMES[day],
  template[4],
  template[5],
  template[6],
  template[7],
  i === 0 ? template[8] : '',
  i === 0 ? template[9] : '',
]);
const end = start + rows.length - 1;

await client.api(`${sheet}/range(address='A${start}:J${end}')`).patch({ values: rows });
await client
  .api(`${sheet}/range(address='C${start}:C${end}')`)
  .patch({ numberFormat: rows.map(() => ['yyyy-mm-dd;@']) });

console.log(`${found.length} rows -> ${rows.length} rows at A${start}:J${end}`);
console.log('Run `npm run msgraph:fetch` to refresh src/data/events.csv.');
