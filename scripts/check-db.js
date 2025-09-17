#!/usr/bin/env node

import { db } from '../src/lib/server/db/index.js';
import { openalex_authors, openalex_papers } from '../src/lib/server/db/schema.js';

async function checkDatabase() {
  console.log('🔍 Checking database...');
  
  try {
    // Check authors
    const authors = await db.select().from(openalex_authors);
    console.log(`📚 Authors in database: ${authors.length}`);
    
    if (authors.length > 0) {
      console.log('First author:', authors[0]);
    }
    
    // Check papers
    const papers = await db.select().from(openalex_papers);
    console.log(`📄 Papers in database: ${papers.length}`);
    
    if (papers.length > 0) {
      console.log('First paper:', papers[0]);
    }
    
  } catch (error) {
    console.error('❌ Database error:', error);
  }
}

checkDatabase();