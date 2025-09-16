#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { db } from '../src/lib/server/db/index.js';
import { eq, and, sql } from 'drizzle-orm';

// No longer using time-based intervals - works_count drives all updates

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

import { 
  openalex_authors,
  openalex_affiliations,
  openalex_topics,
  openalex_concepts,
  openalex_counts_by_year,
  openalex_papers,
  openalex_paper_authors
} from '../src/lib/server/db/schema.js';

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
  console.log(`🌐 Fetching OpenAlex data for: ${openAlexId}`);
  
  try {
    const response = await fetch(`https://api.openalex.org/authors/${openAlexId}`, {
      headers: {
        'User-Agent': 'VCSI-Website/1.0 (https://vcsi.uvm.edu; mailto:jstonge1@uvm.edu)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`📥 Received data for: ${data.display_name}`);
    return data;
  } catch (error) {
    console.error(`❌ Failed to fetch ${openAlexId}: ${error.message}`);
    return null;
  }
}

// Helper function to safely get nested values
function safeGet(obj, path, defaultValue = null) {
  try {
    return path.split('.').reduce((current, key) => current?.[key], obj) ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

// Extract and normalize author data from API response
function extractAuthorData(apiData) {
  const summaryStats = apiData.summary_stats || {};
  
  return {
    openalex_id: apiData.id.replace('https://openalex.org/', ''), // Store just the ID part
    orcid: safeGet(apiData, 'ids.orcid'),
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

// Extract affiliations data
function extractAffiliations(apiData, authorId) {
  const affiliations = [];
  
  // Process last_known_institutions
  if (apiData.last_known_institutions) {
    for (const institution of apiData.last_known_institutions) {
      affiliations.push({
        author_id: authorId,
        institution_id: institution.id,
        institution_display_name: institution.display_name,
        institution_ror: institution.ror,
        institution_country_code: institution.country_code,
        institution_type: institution.type,
        years: JSON.stringify([]) // last_known doesn't have years
      });
    }
  }
  
  // Process affiliations with years
  if (apiData.affiliations) {
    for (const affiliation of apiData.affiliations) {
      const institution = affiliation.institution;
      affiliations.push({
        author_id: authorId,
        institution_id: institution.id,
        institution_display_name: institution.display_name,
        institution_ror: institution.ror,
        institution_country_code: institution.country_code,
        institution_type: institution.type,
        years: JSON.stringify(affiliation.years || [])
      });
    }
  }
  
  return affiliations;
}

// Extract topics data
function extractTopics(apiData, authorId) {
  const topics = [];
  
  if (apiData.topics) {
    for (const topic of apiData.topics) {
      topics.push({
        author_id: authorId,
        topic_id: topic.id,
        display_name: topic.display_name,
        score: topic.score,
        subfield_id: safeGet(topic, 'subfield.id'),
        subfield_display_name: safeGet(topic, 'subfield.display_name'),
        field_id: safeGet(topic, 'field.id'),
        field_display_name: safeGet(topic, 'field.display_name'),
        domain_id: safeGet(topic, 'domain.id'),
        domain_display_name: safeGet(topic, 'domain.display_name')
      });
    }
  }
  
  return topics;
}

// Extract concepts data
function extractConcepts(apiData, authorId) {
  const concepts = [];
  
  if (apiData.x_concepts) {
    for (const concept of apiData.x_concepts) {
      concepts.push({
        author_id: authorId,
        concept_id: concept.id,
        wikidata: concept.wikidata,
        display_name: concept.display_name,
        level: concept.level,
        score: concept.score
      });
    }
  }
  
  return concepts;
}

// Extract yearly counts data
function extractCountsByYear(apiData, authorId) {
  const countsByYear = [];
  
  if (apiData.counts_by_year) {
    for (const yearData of apiData.counts_by_year) {
      countsByYear.push({
        author_id: authorId,
        year: yearData.year,
        works_count: yearData.works_count,
        cited_by_count: yearData.cited_by_count,
        oa_works_count: yearData.oa_works_count
      });
    }
  }
  
  return countsByYear;
}

// Removed getLatestPaperDate - no longer needed with works_count-only approach

// Fetch papers for an author with optional date filtering for incremental updates
async function fetchPapersData(authorOpenAlexId, sinceDate = null) {
  const isIncremental = sinceDate !== null;
  console.log(`📄 Fetching ${isIncremental ? 'new' : 'all'} papers for: ${authorOpenAlexId}${sinceDate ? ` since ${sinceDate}` : ''}`);
  
  try {
    // Build URL with optional date filter
    let baseUrl = `https://api.openalex.org/works?filter=author.id:${authorOpenAlexId}&mailto=vcsi@uvm.edu`;
    if (sinceDate) {
      // Format date for OpenAlex API (YYYY-MM-DD)
      const dateObj = sinceDate instanceof Date ? sinceDate : new Date(sinceDate);
      const formattedDate = dateObj.toISOString().split('T')[0];
      baseUrl += `,from_publication_date:${formattedDate}`;
    }
    
    // Fetch all papers for this author (with full pagination)
    let allPapers = [];
    let page = 1;
    // Remove maxPages limit to fetch ALL papers
    
    do {
      const url = `${baseUrl}&per_page=100&page=${page}`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'VCSI-Website/1.0 (https://vcsi.uvm.edu; mailto:jstonge1@uvm.edu)'
        }
      });
      
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
      
      // Add delay between requests to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Safety check - if we're getting too many pages, something might be wrong
      if (page > 50) {
        console.warn(`⚠️  Fetched ${page} pages (${allPapers.length} papers) - this author is very prolific!`);
        break;
      }
      
    } while (true);
    
    console.log(`📄 Total papers fetched: ${allPapers.length} ${isIncremental ? '(incremental)' : '(full)'}`);
    return allPapers;
    
  } catch (error) {
    console.error(`❌ Failed to fetch papers for ${authorOpenAlexId}: ${error.message}`);
    return [];
  }
}

// Extract paper data from API response
function extractPaperData(paperApiData, authorId) {
  const primaryLocation = paperApiData.primary_location || {};
  
  return {
    author_id: authorId,
    openalex_id: paperApiData.id?.replace('https://openalex.org/', '') || '',
    doi: paperApiData.doi,
    title: paperApiData.title || 'Untitled',
    publication_year: paperApiData.publication_year,
    publication_date: paperApiData.publication_date,
    type: paperApiData.type,
    cited_by_count: paperApiData.cited_by_count || 0,
    is_open_access: paperApiData.open_access?.is_oa ? 1 : 0,
    primary_location: JSON.stringify(primaryLocation),
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

// Extract paper authors data
function extractPaperAuthors(paperApiData, paperId) {
  const paperAuthors = [];
  
  if (paperApiData.authorships) {
    for (const authorship of paperApiData.authorships) {
      const author = authorship.author || {};
      const institutions = authorship.institutions || [];
      const primaryInstitution = institutions[0] || {};
      
      paperAuthors.push({
        paper_id: paperId,
        author_openalex_id: author.id?.replace('https://openalex.org/', '') || null,
        author_name: author.display_name,
        author_orcid: author.orcid,
        is_corresponding: authorship.is_corresponding ? 1 : 0,
        author_position: authorship.author_position,
        raw_affiliation_string: authorship.raw_affiliation_string,
        institution_display_name: primaryInstitution.display_name,
        institution_country_code: primaryInstitution.country_code
      });
    }
  }
  
  return paperAuthors;
}

async function populateOpenAlexDatabase() {
  console.log('🗃️  Starting OpenAlex database population...');
  
  // Read CSV file
  const csvPath = join(projectRoot, 'src/data/members.csv');
  const csvContent = readFileSync(csvPath, 'utf8');
  const memberRows = parseCSV(csvContent);
  
  // Filter members with OpenAlex IDs
  const membersWithOpenAlex = memberRows.filter(member => member.openAlexId && member.openAlexId.trim());
  console.log(`📚 Found ${membersWithOpenAlex.length} members with OpenAlex IDs`);

  // Check which authors already exist
  const existingAuthors = await db.select({ 
    openalex_id: openalex_authors.openalex_id,
    last_updated: openalex_authors.last_updated
  }).from(openalex_authors);
  
  const existingIds = new Set(existingAuthors.map(a => a.openalex_id));
  console.log(`📋 Found ${existingIds.size} existing authors in database`);

  for (const member of membersWithOpenAlex) {
    const openAlexId = member.openAlexId.trim();
    
    // Check existing authors using works_count
    if (existingIds.has(openAlexId)) {
      // Get current works_count from OpenAlex API
      const currentAuthorData = await fetchAuthorData(openAlexId);
      if (!currentAuthorData) {
        console.log(`⏭️  Skipping ${member.name} due to API error`);
        continue;
      }
      
      const currentWorksCount = currentAuthorData.works_count;
      
      // Get stored data
      const authorRecord = await db.select({ 
        works_count: openalex_authors.works_count,
        id: openalex_authors.id 
      })
      .from(openalex_authors)
      .where(eq(openalex_authors.openalex_id, openAlexId))
      .limit(1);
      
      if (authorRecord.length > 0) {
        const storedWorksCount = authorRecord[0].works_count;
        const actualPapers = await db.select({ count: sql`count(*)` })
          .from(openalex_papers)
          .where(eq(openalex_papers.author_id, authorRecord[0].id));
        
        const storedPaperCount = actualPapers[0]?.count || 0;
        
        // Check if we need to update
        if (storedPaperCount >= currentWorksCount && storedWorksCount === currentWorksCount) {
          console.log(`⏭️  Skipping ${member.name} (${openAlexId}) - data complete (${storedPaperCount}/${currentWorksCount})`);
          continue;
        }
        
        // Update needed - fetch missing papers
        const missingPapers = currentWorksCount - storedPaperCount;
        console.log(`🔄 Updating ${member.name} (${openAlexId}) - ${missingPapers} papers needed (has ${storedPaperCount}/${currentWorksCount})`);
        
        // Update author record with current works_count
        const updatedAuthorData = extractAuthorData(currentAuthorData);
        await db.update(openalex_authors)
          .set({
            works_count: updatedAuthorData.works_count,
            cited_by_count: updatedAuthorData.cited_by_count,
            h_index: updatedAuthorData.h_index,
            i10_index: updatedAuthorData.i10_index,
            last_updated: new Date().toISOString()
          })
          .where(eq(openalex_authors.id, authorRecord[0].id));
        
        // Fetch ALL papers to fill gaps
        const allPapersData = await fetchPapersData(openAlexId);
        
        if (allPapersData.length > 0) {
          let actuallyInserted = 0;
          
          for (const paperApiData of allPapersData) {
            try {
              const paperOpenAlexId = paperApiData.id.replace('https://openalex.org/', '');
              const existingPaper = await db.select({ id: openalex_papers.id })
                .from(openalex_papers)
                .where(and(
                  eq(openalex_papers.openalex_id, paperOpenAlexId),
                  eq(openalex_papers.author_id, authorRecord[0].id)
                ))
                .limit(1);
              
              if (existingPaper.length === 0) {
                const paperData = extractPaperData(paperApiData, authorRecord[0].id);
                const [insertedPaper] = await db.insert(openalex_papers).values(paperData).returning({ id: openalex_papers.id });
                
                const paperAuthors = extractPaperAuthors(paperApiData, insertedPaper.id);
                if (paperAuthors.length > 0) {
                  await db.insert(openalex_paper_authors).values(paperAuthors);
                }
                
                actuallyInserted++;
              }
            } catch (paperError) {
              console.error(`❌ Error inserting paper "${paperApiData.title}": ${paperError.message}`);
            }
          }
          
          if (actuallyInserted > 0) {
            console.log(`✅ Added ${actuallyInserted} papers for ${member.name}`);
          } else {
            console.log(`🔄 No new papers to add for ${member.name}`);
          }
        }
        
        continue;
      }
    } else {
      // New author - process normally
      try {
      // Fetch data from OpenAlex API
      const apiData = await fetchAuthorData(openAlexId);
      
      if (!apiData) {
        console.log(`⏭️  Skipping ${member.name} due to API error`);
        continue;
      }
      
      // Transform API data to our format
      const authorData = extractAuthorData(apiData);
      
      console.log(`📖 Processing: ${authorData.display_name} (${member.name})`);

      // Insert author
      const [insertedAuthor] = await db.insert(openalex_authors).values(authorData).returning({ id: openalex_authors.id });
      const authorId = insertedAuthor.id;

      // Insert affiliations
      const affiliations = extractAffiliations(apiData, authorId);
      if (affiliations.length > 0) {
        await db.insert(openalex_affiliations).values(affiliations);
        console.log(`📋 Inserted ${affiliations.length} affiliations`);
      }

      // Insert topics
      const topics = extractTopics(apiData, authorId);
      if (topics.length > 0) {
        await db.insert(openalex_topics).values(topics);
        console.log(`🏷️  Inserted ${topics.length} topics`);
      }

      // Insert concepts
      const concepts = extractConcepts(apiData, authorId);
      if (concepts.length > 0) {
        await db.insert(openalex_concepts).values(concepts);
        console.log(`💡 Inserted ${concepts.length} concepts`);
      }

      // Insert yearly counts
      const countsByYear = extractCountsByYear(apiData, authorId);
      if (countsByYear.length > 0) {
        await db.insert(openalex_counts_by_year).values(countsByYear);
        console.log(`📈 Inserted ${countsByYear.length} yearly count records`);
      }

      console.log(`✅ Completed author: ${authorData.display_name}`);

      // Fetch and insert papers for this author (all papers for new authors)
      console.log(`📄 Fetching all papers for: ${authorData.display_name}`);
      const papersData = await fetchPapersData(openAlexId);
      
      if (papersData.length > 0) {
        console.log(`📄 Inserting ${papersData.length} papers...`);
        
        for (const paperApiData of papersData) {
          try {
            const paperData = extractPaperData(paperApiData, authorId);
            const [insertedPaper] = await db.insert(openalex_papers).values(paperData).returning({ id: openalex_papers.id });
            
            // Insert paper authors
            const paperAuthors = extractPaperAuthors(paperApiData, insertedPaper.id);
            if (paperAuthors.length > 0) {
              await db.insert(openalex_paper_authors).values(paperAuthors);
            }
          } catch (paperError) {
            console.error(`❌ Error inserting paper "${paperApiData.title}": ${paperError.message}`);
          }
        }
        
        console.log(`📄 Inserted ${papersData.length} papers for ${authorData.display_name}`);
      } else {
        console.log(`📄 No papers found for ${authorData.display_name}`);
      }

      console.log(`✅ Completed: ${authorData.display_name}`);

      // Add a longer delay to be respectful to the API (papers fetch takes more requests)
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      console.error(`❌ Error processing ${member.name} (${openAlexId}):`, error);
    }
    } // Close else clause for new authors
  } // Close main for loop

  console.log('\n🎉 OpenAlex database population complete!');
  
  // Show summary
  const authorCount = await db.select().from(openalex_authors);
  const topicCount = await db.select().from(openalex_topics);
  const conceptCount = await db.select().from(openalex_concepts);
  const paperCount = await db.select().from(openalex_papers);
  const paperAuthorCount = await db.select().from(openalex_paper_authors);
  console.log(`📊 Summary: ${authorCount.length} authors, ${topicCount.length} topics, ${conceptCount.length} concepts, ${paperCount.length} papers, ${paperAuthorCount.length} paper-author relationships`);
}

// Run the script
populateOpenAlexDatabase().catch(console.error);