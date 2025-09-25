import { db } from '../src/lib/server/db/index.js';
import { openalex_papers } from '../src/lib/server/db/schema.js';
import { like, eq } from 'drizzle-orm';

async function checkSpecificDOI() {
  const searchDOI = '10.48550/arXiv.1805.09959';
  
  console.log(`🔍 Looking for DOI: ${searchDOI}`);
  
  // Try multiple formats
  const formats = [
    searchDOI,
    `https://doi.org/${searchDOI}`,
    `http://dx.doi.org/${searchDOI}`,
    `doi:${searchDOI}`
  ];
  
  for (const format of formats) {
    console.log(`\n🔎 Searching for: "${format}"`);
    const found = await db.select()
      .from(openalex_papers)
      .where(eq(openalex_papers.doi, format))
      .limit(5);
    
    if (found.length > 0) {
      console.log(`✅ Found ${found.length} match(es):`);
      found.forEach(paper => {
        console.log(`   - Author: ${paper.author_openalex_id}`);
        console.log(`   - Title: ${paper.title}`);
        console.log(`   - DOI: ${paper.doi}`);
      });
    } else {
      console.log(`❌ Not found with format: ${format}`);
    }
  }
  
  // Also search for arXiv papers with LIKE
  console.log(`\n🔎 Searching for arXiv papers containing "1805.09959"...`);
  const arxivPapers = await db.select()
    .from(openalex_papers)
    .where(like(openalex_papers.doi, '%1805.09959%'))
    .limit(10);
    
  if (arxivPapers.length > 0) {
    console.log(`📄 Found ${arxivPapers.length} arXiv paper(s) with that ID:`);
    arxivPapers.forEach(paper => {
      console.log(`   - DOI: ${paper.doi}`);
      console.log(`   - Title: ${paper.title}`);
      console.log(`   - Author: ${paper.author_openalex_id}`);
      console.log('');
    });
  }
}

checkSpecificDOI().catch(console.error);