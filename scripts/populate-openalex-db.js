#!/usr/bin/env node

import 'dotenv/config';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { csvParse } from 'd3-dsv';
import { db } from '../src/lib/server/db/index.js';
import { eq, and } from 'drizzle-orm';
import {
  openalex_authors,
  openalex_papers,
  paper_authors
} from '../src/lib/server/db/schema.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const OPENALEX_API_KEY = process.env.OPENALEXAPI;


// Rate limiter: ensures we don't exceed 10 requests per second
const RATE_LIMIT_DELAY = 150; // 150ms = ~6.6 requests/second (safe margin under 10/sec)
let lastRequestTime = 0;

async function rateLimitedFetch(url, options = {}) {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    const waitTime = RATE_LIMIT_DELAY - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }

  lastRequestTime = Date.now();
  return fetch(url, options);
}

// Fetch author data from OpenAlex API
async function fetchAuthorData(openAlexId) {
  const url = `https://api.openalex.org/authors/${openAlexId}?api_key=${OPENALEX_API_KEY}`;
  console.log(`🌐 Fetching author: ${openAlexId}`);

  try {
    const response = await rateLimitedFetch(url, {
      headers: {
        'User-Agent': 'VCSI-Website/1.0 (https://vcsi.uvm.edu; mailto:jstonge1@uvm.edu)'
      }
    });

    if (response.status === 429) {
      console.warn('⚠️  Rate limited! Waiting 2 seconds...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      return fetchAuthorData(openAlexId); // Retry
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Failed to fetch ${openAlexId}: ${error.message}`);
    return null;
  }
}

// Fetch papers for an author with full pagination
// If sinceDate is provided, only fetch papers updated in OpenAlex after that date (requires API key)
async function fetchAuthorPapers(openAlexId, sinceDate = null) {
  const dateInfo = sinceDate ? ` (updated since ${sinceDate})` : ' (all papers)';
  console.log(`📄 Fetching papers for: ${openAlexId}${dateInfo}`);

  try {
    let baseUrl = `https://api.openalex.org/works?filter=author.id:${openAlexId}`;
    if (sinceDate) {
      baseUrl += `,from_updated_date:${sinceDate}`;
    }
    baseUrl += `&api_key=${OPENALEX_API_KEY}`;

    // Fetch all papers for this author (with full pagination)
    let allPapers = [];
    let page = 1;

    do {
      const url = `${baseUrl}&per_page=100&page=${page}`;

      const response = await rateLimitedFetch(url, {
        headers: {
          'User-Agent': 'VCSI-Website/1.0 (https://vcsi.uvm.edu; mailto:jstonge1@uvm.edu)'
        }
      });

      if (response.status === 429) {
        console.warn('⚠️  Rate limited! Waiting 2 seconds...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        continue; // Retry this page
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Check if we got results
      if (data.results && data.results.length > 0) {
        allPapers = allPapers.concat(data.results);
        console.log(`📄 Fetched page ${page}, got ${data.results.length} papers (total: ${allPapers.length})`);

        // Continue if we got a full page (100 results)
        const hasMorePages = data.results.length === 100;
        if (!hasMorePages) {
          break;
        }
      } else {
        break;
      }

      page++;

      // Safety check - if we're getting too many pages, something might be wrong
      if (page > 50) {
        console.warn(`⚠️  Fetched ${page} pages (${allPapers.length} papers) - this author is very prolific!`);
        break;
      }

    } while (true);

    console.log(`📄 Total papers fetched: ${allPapers.length}`);
    return allPapers;

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

// Extract paper data (no author - that's in junction table now)
function extractPaperData(paperApiData) {
  return {
    openalex_id: paperApiData.id.replace('https://openalex.org/', ''),
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
  console.log('🗃️  Starting OpenAlex population/update...');

  // Read members CSV file
  const csvPath = join(projectRoot, 'src/data/members.csv');
  const csvContent = readFileSync(csvPath, 'utf8');
  const memberRows = csvParse(csvContent);

  // Filter members with OpenAlex IDs
  const membersWithOpenAlex = memberRows.filter(member => member.openAlexId && member.openAlexId.trim());
  console.log(`📚 Found ${membersWithOpenAlex.length} members with OpenAlex IDs`);

  for (const member of membersWithOpenAlex) {
    const openAlexId = member.openAlexId.trim();
    console.log(`\n👤 Processing: ${member.name} (${openAlexId})`);
    console.log(`   Status: ${member.status}, ID from CSV: "${member.openAlexId}"`);
    
    try {
      // Check if author already exists
      const existingAuthor = await db.select()
        .from(openalex_authors)
        .where(eq(openalex_authors.openalex_id, openAlexId))
        .limit(1);

      // Fetch author data (always fetch to get updated metrics)
      const authorApiData = await fetchAuthorData(openAlexId);
      if (!authorApiData) {
        console.log(`⏭️  Skipping ${member.name} - no API data`);
        continue;
      }

      const authorData = extractAuthorData(authorApiData);
      let sinceDate = null;

      if (existingAuthor.length > 0) {
        // Update existing author with fresh metrics
        sinceDate = existingAuthor[0].last_updated?.split('T')[0]; // Get date part only
        await db.update(openalex_authors)
          .set(authorData)
          .where(eq(openalex_authors.openalex_id, openAlexId));
        console.log(`🔄 Updated author: ${authorData.display_name}`);
      } else {
        // Insert new author
        await db.insert(openalex_authors).values(authorData);
        console.log(`✅ Inserted author: ${authorData.display_name}`);
      }

      // Fetch papers (only those updated since last sync if author existed)
      const papersApiData = await fetchAuthorPapers(openAlexId, sinceDate);
      if (papersApiData.length > 0) {
        console.log(`📄 Processing ${papersApiData.length} papers...`);

        let newPapers = 0;
        let newLinks = 0;
        for (const paperApiData of papersApiData) {
          try {
            const paperOpenAlexId = paperApiData.id.replace('https://openalex.org/', '');

            // Check if paper already exists
            const existingPaper = await db.select()
              .from(openalex_papers)
              .where(eq(openalex_papers.openalex_id, paperOpenAlexId))
              .limit(1);

            if (existingPaper.length === 0) {
              // Insert new paper
              const paperData = extractPaperData(paperApiData);
              await db.insert(openalex_papers).values(paperData);
              newPapers++;
            }

            // Check if paper-author link already exists
            const existingLink = await db.select()
              .from(paper_authors)
              .where(and(
                eq(paper_authors.paper_openalex_id, paperOpenAlexId),
                eq(paper_authors.author_openalex_id, openAlexId)
              ))
              .limit(1);

            if (existingLink.length === 0) {
              // Insert paper-author relationship
              await db.insert(paper_authors).values({
                paper_openalex_id: paperOpenAlexId,
                author_openalex_id: openAlexId
              });
              newLinks++;
            }
          } catch (paperError) {
            console.error(`❌ Error processing paper "${paperApiData.title}": ${paperError.message}`);
          }
        }

        console.log(`✅ Inserted ${newPapers} new papers, ${newLinks} new author links`);
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error processing ${member.name}: ${error.message}`);
    }
  }

  console.log('\n🎉 OpenAlex population/update complete!');

  // Show summary
  const authorCount = await db.select().from(openalex_authors);
  const paperCount = await db.select().from(openalex_papers);
  const linkCount = await db.select().from(paper_authors);
  console.log(`📊 Summary: ${authorCount.length} authors, ${paperCount.length} papers, ${linkCount.length} author-paper links`);
}

// Run the script
populateOpenAlexDatabase().catch(console.error);