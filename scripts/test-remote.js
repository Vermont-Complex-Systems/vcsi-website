#!/usr/bin/env node

import { db } from '../src/lib/server/db/index.js';
import { eq } from 'drizzle-orm';
import { openalex_authors, openalex_papers } from '../src/lib/server/db/schema.js';
import membersData from '../src/data/members.csv' assert { type: 'dsv' };

async function testRemoteFunctions() {
  console.log('🧪 Testing remote functions...');
  
  try {
    // Test getMember equivalent
    console.log('\n1. Testing member lookup...');
    const testSlug = 'jstonge'; // or whatever member exists
    const member = membersData.filter(d => d.id === testSlug);
    console.log(`Member found:`, member.length > 0 ? member[0] : 'Not found');
    
    if (member.length > 0 && member[0].openAlexId) {
      const openAlexId = member[0].openAlexId;
      console.log(`OpenAlex ID: ${openAlexId}`);
      
      // Test getOpenAlexAuthor equivalent
      console.log('\n2. Testing author lookup...');
      const author = await db.select()
        .from(openalex_authors)
        .where(eq(openalex_authors.openalex_id, openAlexId))
        .limit(1);
      
      console.log(`Author found:`, author.length > 0 ? author[0].display_name : 'Not found');
      
      if (author.length > 0) {
        // Test getAuthorPapers equivalent
        console.log('\n3. Testing papers lookup...');
        const papers = await db.select()
          .from(openalex_papers)
          .where(eq(openalex_papers.author_openalex_id, openAlexId))
          .limit(5);
        
        console.log(`Papers found: ${papers.length}`);
        if (papers.length > 0) {
          console.log('First paper:', papers[0].title);
        }
        
        // Test complete flow
        console.log('\n4. Testing complete flow...');
        const result = {
          ...member[0],
          openAlex: {
            ...author[0],
            papers: papers
          }
        };
        console.log('✅ Complete flow works!');
        console.log('Result structure:', {
          name: result.name,
          openAlex: {
            display_name: result.openAlex.display_name,
            works_count: result.openAlex.works_count,
            papers_count: result.openAlex.papers.length
          }
        });
      }
    }
    
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testRemoteFunctions();