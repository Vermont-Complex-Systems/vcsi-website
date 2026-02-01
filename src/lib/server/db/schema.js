// frontend/src/lib/server/db/schema.js
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

// ----------------------------
//
// OpenAlex Author Tables
//
// ----------------------------

export const openalex_authors = sqliteTable('openalex_authors', {
  openalex_id: text('openalex_id').primaryKey(), // A5026024797
  orcid: text('orcid'),
  display_name: text('display_name').notNull(),
  display_name_alternatives: text('display_name_alternatives'), // JSON array as text
  works_count: integer('works_count'),
  cited_by_count: integer('cited_by_count'),
  h_index: integer('h_index'),
  i10_index: integer('i10_index'),
  two_year_mean_citedness: real('two_year_mean_citedness'),
  works_api_url: text('works_api_url'),
  updated_date: text('updated_date'),
  created_date: text('created_date'),
  last_updated: text('last_updated') // When we fetched this data
});

export const openalex_papers = sqliteTable('openalex_papers', {
  openalex_id: text('openalex_id').primaryKey(), // W2964039088
  author_openalex_id: text('author_openalex_id').notNull(), // A5026024797
  doi: text('doi'),
  title: text('title').notNull(),
  publication_year: integer('publication_year'),
  publication_date: text('publication_date'),
  type: text('type'), // article, book-chapter, etc.
  cited_by_count: integer('cited_by_count'),
  is_open_access: integer('is_open_access'), // 0 or 1
  primary_location: text('primary_location'), // JSON
  abstract: text('abstract'),
  language: text('language'),
  concepts: text('concepts'), // JSON array
  topics: text('topics'), // JSON array
  keywords: text('keywords'), // JSON array
  grants: text('grants'), // JSON array
  referenced_works_count: integer('referenced_works_count'),
  created_date: text('created_date'),
  updated_date: text('updated_date')
});
