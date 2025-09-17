#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { db } from '../src/lib/server/db/index.js';
import { eq } from 'drizzle-orm';
import { 
  openalex_authors,
  openalex_papers
} from '../src/lib/server/db/schema.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Parse CSV file
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    return row;
  });
}

// Fetch author data from OpenAlex API
async function fetchAuthorData(openAlexId) {
  console.log(`🌐 Fetching author: ${openAlexId}`);
  
  try {
    const response = await fetch(`https://api.openalex.org/authors/${openAlexId}`, {
      headers: {
        'User-Agent': 'VCSI-Website/1.0 (https://vcsi.uvm.edu; mailto:jstonge1@uvm.edu)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`❌ Failed to fetch ${openAlexId}: ${error.message}`);
    return null;
  }
}

// Fetch papers for an author
async function fetchAuthorPapers(openAlexId) {
  console.log(`📄 Fetching papers for: ${openAlexId}`);
  
  try {
    const response = await fetch(`https://api.openalex.org/works?filter=author.id:${openAlexId}&per_page=100`, {
      headers: {
        'User-Agent': 'VCSI-Website/1.0 (https://vcsi.uvm.edu; mailto:jstonge1@uvm.edu)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`❌ Failed to fetch papers for ${openAlexId}: ${error.message}`);
    return [];
  }
}

// Extract author data
function extractAuthorData(apiData) {
  const summaryStats = apiData.summary_stats || {};
  
  return {
    openalex_id: apiData.id.replace('https://openalex.org/', ''),
    orcid: apiData.ids?.orcid || null,
    display_name: apiData.display_name,
    display_name_alternatives: JSON.stringify(apiData.display_name_alternatives || []),
    works_count: apiData.works_count,
    cited_by_count: apiData.cited_by_count,
    h_index: summaryStats.h_index,
    i10_index: summaryStats.i10_index,
    two_year_mean_citedness: summaryStats['2yr_mean_citedness'],
    works_api_url: apiData.works_api_url,
    updated_date: apiData.updated_date,
    created_date: apiData.created_date,
    last_updated: new Date().toISOString()
  };
}

// Extract paper data
function extractPaperData(paperApiData, authorOpenAlexId) {
  return {
    openalex_id: paperApiData.id.replace('https://openalex.org/', ''),
    author_openalex_id: authorOpenAlexId,
    doi: paperApiData.doi,
    title: paperApiData.title || 'Untitled',
    publication_year: paperApiData.publication_year,
    publication_date: paperApiData.publication_date,
    type: paperApiData.type,
    cited_by_count: paperApiData.cited_by_count || 0,
    is_open_access: paperApiData.open_access?.is_oa ? 1 : 0,
    primary_location: JSON.stringify(paperApiData.primary_location || {}),
    abstract: paperApiData.abstract_inverted_index ? '[Abstract available]' : null,
    language: paperApiData.language,
    concepts: JSON.stringify(paperApiData.concepts || []),
    topics: JSON.stringify(paperApiData.topics || []),
    keywords: JSON.stringify(paperApiData.keywords || []),
    grants: JSON.stringify(paperApiData.grants || []),
    referenced_works_count: paperApiData.referenced_works_count || 0,
    created_date: paperApiData.created_date,
    updated_date: paperApiData.updated_date
  };
}

async function populateOpenAlexDatabase() {
  console.log('🗃️  Starting simple OpenAlex population...');
  
  // Read CSV file
  const csvPath = join(projectRoot, 'src/data/members.csv');
  const csvContent = readFileSync(csvPath, 'utf8');
  const memberRows = parseCSV(csvContent);
  
  // Filter members with OpenAlex IDs
  const membersWithOpenAlex = memberRows.filter(member => member.openAlexId && member.openAlexId.trim());
  console.log(`📚 Found ${membersWithOpenAlex.length} members with OpenAlex IDs`);

  for (const member of membersWithOpenAlex) {
    const openAlexId = member.openAlexId.trim();
    console.log(`\n👤 Processing: ${member.name} (${openAlexId})`);
    
    try {
      // Check if author already exists
      const existingAuthor = await db.select()
        .from(openalex_authors)
        .where(eq(openalex_authors.openalex_id, openAlexId))
        .limit(1);
      
      if (existingAuthor.length > 0) {
        console.log(`⏭️  Author already exists: ${member.name}`);
        continue;
      }
      
      // Fetch author data
      const authorApiData = await fetchAuthorData(openAlexId);
      if (!authorApiData) {
        console.log(`⏭️  Skipping ${member.name} - no API data`);
        continue;
      }
      
      // Insert author
      const authorData = extractAuthorData(authorApiData);
      await db.insert(openalex_authors).values(authorData);
      console.log(`✅ Inserted author: ${authorData.display_name}`);
      
      // Fetch and insert papers
      const papersApiData = await fetchAuthorPapers(openAlexId);
      if (papersApiData.length > 0) {
        console.log(`📄 Processing ${papersApiData.length} papers...`);
        
        let insertedCount = 0;
        for (const paperApiData of papersApiData) {
          try {
            const paperOpenAlexId = paperApiData.id.replace('https://openalex.org/', '');
            
            // Check if paper already exists
            const existingPaper = await db.select()
              .from(openalex_papers)
              .where(eq(openalex_papers.openalex_id, paperOpenAlexId))
              .limit(1);
            
            if (existingPaper.length === 0) {
              const paperData = extractPaperData(paperApiData, openAlexId);
              await db.insert(openalex_papers).values(paperData);
              insertedCount++;
            }
          } catch (paperError) {
            console.error(`❌ Error processing paper "${paperApiData.title}": ${paperError.message}`);
          }
        }
        
        console.log(`✅ Inserted ${insertedCount} new papers (${papersApiData.length - insertedCount} duplicates skipped)`);
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error processing ${member.name}: ${error.message}`);
    }
  }
  
  console.log('\n🎉 Simple OpenAlex population complete!');
  
  // Show summary
  const authorCount = await db.select().from(openalex_authors);
  const paperCount = await db.select().from(openalex_papers);
  console.log(`📊 Summary: ${authorCount.length} authors, ${paperCount.length} papers`);
}

// Run the script
populateOpenAlexDatabase().catch(console.error);