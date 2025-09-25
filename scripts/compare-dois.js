import { readFileSync } from 'fs';
import { join } from 'path';
import { db } from '../src/lib/server/db/index.js';
import { openalex_papers } from '../src/lib/server/db/schema.js';

async function compareDOIs() {
  console.log('🔍 Comparing Mass Mutual DOIs with OpenAlex database...\n');
  
  // Read Mass Mutual CSV
  const csvPath = join('src/data/publications/mass-mutual.csv');
  const csvContent = readFileSync(csvPath, 'utf-8');
  const csvLines = csvContent.trim().split('\n');
  const mmcoeDOIs = csvLines.slice(1).filter(line => line.trim()).map(line => line.trim());
  
  console.log(`📄 Mass Mutual CSV has: ${mmcoeDOIs.length} DOIs`);
  
  // Get DOIs from OpenAlex database
  const dbPapers = await db.select({ doi: openalex_papers.doi }).from(openalex_papers);
  const dbDOIs = dbPapers.map(p => p.doi).filter(doi => doi) // Remove nulls
    .map(doi => doi.replace('https://doi.org/', '').toLowerCase()); // Normalize to just DOI part and lowercase
  
  console.log(`🗃️  OpenAlex DB has: ${dbDOIs.length} DOIs total`);
  
  // Find overlaps and differences (case-insensitive)
  const mmcoeSet = new Set(mmcoeDOIs.map(doi => doi.toLowerCase()));
  const dbSet = new Set(dbDOIs);
  
  // DOIs in Mass Mutual but NOT in database
  const missingFromDB = mmcoeDOIs.filter(doi => !dbSet.has(doi.toLowerCase()));
  
  // DOIs in database but NOT in Mass Mutual (shouldn't happen if populated correctly)
  const extraInDB = dbDOIs.filter(doi => mmcoeSet.has(doi));
  
  // Overlap
  const overlap = mmcoeDOIs.filter(doi => dbSet.has(doi.toLowerCase()));
  
  console.log(`\n📊 RESULTS:`);
  console.log(`✅ DOIs in both: ${overlap.length}`);
  console.log(`❌ DOIs in Mass Mutual CSV but missing from DB: ${missingFromDB.length}`);
  console.log(`➕ DOIs in DB that match Mass Mutual: ${extraInDB.length}`);
  
  if (missingFromDB.length > 0) {
    console.log(`\n🚨 MISSING FROM DATABASE:`);
    missingFromDB.forEach((doi, i) => {
      console.log(`${i + 1}. ${doi}`);
    });
  }
  
  // Check if any Mass Mutual DOIs exist under different authors in DB
  if (missingFromDB.length > 0) {
    console.log(`\n🔍 Checking if missing DOIs exist under other authors...`);
    
    for (const doi of missingFromDB.slice(0, 5)) { // Check first 5 to avoid spam
      const found = await db.select()
        .from(openalex_papers)
        .where(openalex_papers.doi.eq(`https://doi.org/${doi}`))
        .limit(1);
      
      if (found.length > 0) {
        console.log(`📍 Found ${doi} under author: ${found[0].author_openalex_id}`);
      }
    }
  }
  
  console.log(`\n💡 This discrepancy could be because:`);
  console.log(`   - Papers authored by people not in your members.csv`);
  console.log(`   - Papers not indexed in OpenAlex`);
  console.log(`   - OpenAlex author profiles missing some publications`);
}

compareDOIs().catch(console.error);