#!/usr/bin/env node

import 'dotenv/config';
import { mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';
import sharp from 'sharp';
import settings from '../src/appSettings.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATIC_DIR = join(__dirname, '..', 'static');

// Define asset folders to sync: { remotePath: localPath }
const ASSET_FOLDERS = {
  'assets/headshots/students': 'common/assets/students',
};

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

async function downloadFile(client, driveId, itemId) {
  // Get the download URL and fetch content
  const response = await client
    .api(`/drives/${driveId}/items/${itemId}/content`)
    .responseType('arraybuffer')
    .get();

  return Buffer.from(response);
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

  for (const [remotePath, localPath] of Object.entries(ASSET_FOLDERS)) {
    console.log(`\nSyncing: ${remotePath} -> ${localPath}`);

    const outputDir = join(STATIC_DIR, localPath);
    mkdirSync(outputDir, { recursive: true });

    try {
      // Get items in the folder
      const items = await client
        .api(`/drives/${driveId}/root:/${remotePath}:/children`)
        .get();

      const files = items.value.filter((item) => item.file);
      console.log(`Found ${files.length} file(s)`);

      for (const file of files) {
        console.log(`  Downloading: ${file.name}`);

        try {
          const content = await downloadFile(client, driveId, file.id);
          const ext = extname(file.name).toLowerCase();
          const name = basename(file.name, ext);

          // Convert webp to jpg, keep other formats as-is
          if (ext === '.webp') {
            const jpgBuffer = await sharp(content).jpeg({ quality: 90 }).toBuffer();
            const outputName = `${name}.jpg`;
            await writeFile(join(outputDir, outputName), jpgBuffer);
            console.log(`    -> ${localPath}/${outputName} (converted from webp)`);
          } else {
            await writeFile(join(outputDir, file.name), content);
            console.log(`    -> ${localPath}/${file.name}`);
          }
        } catch (error) {
          console.error(`    Error downloading: ${error.message}`);
        }
      }
    } catch (error) {
      console.error(`Error accessing folder: ${error.message}`);
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);
