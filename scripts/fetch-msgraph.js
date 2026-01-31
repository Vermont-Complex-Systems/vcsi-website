#!/usr/bin/env node

import 'dotenv/config';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';
import settings from '../src/appSettings.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'src', 'data');

const EXCEL_EXTENSIONS = ['.xlsx', '.xlsm', '.xls'];

function createClient() {
  const credential = new ClientSecretCredential(
    settings.tenantId || process.env.tenantId,
    settings.clientId || process.env.clientId,
    settings.clientSecret || process.env.clientSecret
  );

  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: settings.scopes,
  });

  return Client.initWithMiddleware({ authProvider });
}

function isExcelFile(item) {
  if (!item.file || !item.name) return false;
  const name = item.name.toLowerCase();
  return EXCEL_EXTENSIONS.some((ext) => name.endsWith(ext));
}

function escapeCSVValue(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  // Escape if contains comma, quote, or newline
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function convertToCSV(rows) {
  return rows.map((row) => row.map(escapeCSVValue).join(',')).join('\n');
}

function sanitizeFilename(name) {
  // Remove Excel extension and sanitize for filesystem
  return name
    .replace(/\.(xlsx|xlsm|xls)$/i, '')
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .toLowerCase();
}

async function main() {
  const client = createClient();

  // Get site info
  let site;
  try {
    site = await client.api(`/sites/${settings.siteId}`).get();
  } catch (error) {
    console.error(`Error: ${error.code} - ${error.message}`);
    throw error;
  }

  console.log(`Site: ${site.webUrl}`);

  // Get drives
  const drives = await client.api(`/sites/${site.id}/drives`).get();
  const driveId = drives.value[0].id;

  // Get items in root
  const items = await client.api(`/drives/${driveId}/root/children`).get();
  const excelFiles = items.value.filter(isExcelFile);

  console.log(`\nFound ${excelFiles.length} Excel file(s)`);

  for (const excelFile of excelFiles) {
    console.log(`\nProcessing: ${excelFile.name}`);

    // Get worksheets
    const worksheets = await client
      .api(`/drives/${driveId}/items/${excelFile.id}/workbook/worksheets`)
      .get();

    for (const sheet of worksheets.value) {
      console.log(`  Sheet: ${sheet.name}`);

      try {
        // Get the used range (all data in the sheet)
        const usedRange = await client
          .api(
            `/drives/${driveId}/items/${excelFile.id}/workbook/worksheets/${sheet.id}/usedRange`
          )
          .get();

        const values = usedRange.values || [];

        if (values.length === 0) {
          console.log(`    (empty sheet, skipping)`);
          continue;
        }

        // Convert to CSV
        const csv = convertToCSV(values);

        // Generate filename and determine output directory
        const baseName = sanitizeFilename(excelFile.name);
        const sheetName = sanitizeFilename(sheet.name);
        const filename = `${sheetName}.csv`;

        // Route "publications" Excel to publications subdirectory
        let outputDir = DATA_DIR;
        if (baseName.includes('publication')) {
          outputDir = join(DATA_DIR, 'publications');
          mkdirSync(outputDir, { recursive: true });
        }

        const filepath = join(outputDir, filename);
        writeFileSync(filepath, csv, 'utf8');

        const relativePath = baseName.includes('publication')
          ? `publications/${filename}`
          : filename;
        console.log(`    -> ${relativePath} (${values.length} rows)`);
      } catch (error) {
        console.error(`    Error reading sheet: ${error.message}`);
      }
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);
