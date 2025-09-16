// frontend/src/lib/server/db/schema.js
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

// ----------------------------
//
// Courses Tables
//
// ----------------------------

export const courses = sqliteTable('courses', {
  id: integer('id').primaryKey(),
  course_code: text('course_code').notNull(),
  title: text('title').notNull(),
  credit_hours: text('credit_hours'),
  instruction_method: text('instruction_method'),
  catalog_description: text('catalog_description'),
  section_description: text('section_description'),
  course_structure: text('course_structure'),
  learning_approach: text('learning_approach'),
  programming_requirements: text('programming_requirements'),
  programming_language: text('programming_language'),
  learning_objectives: text('learning_objectives'),
  last_updated: text('last_updated')
});

export const sections = sqliteTable('sections', {
  id: integer('id').primaryKey(),
  course_id: integer('course_id').references(() => courses.id),
  section: text('section').notNull(),
  crn: text('crn').notNull(),
  meeting_time: text('meeting_time'),
  location: text('location'),
  dates: text('dates'),
  instructor_name: text('instructor_name'),
  instructor_email: text('instructor_email'),
  status: text('status'),
  start_date: text('start_date'),
  end_date: text('end_date')
});

export const enrollment = sqliteTable('enrollment', {
  id: integer('id').primaryKey(),
  section_id: integer('section_id').references(() => sections.id),
  section_enrollment: integer('section_enrollment'),
  max_section_enrollment: integer('max_section_enrollment'),
  section_seats_available: integer('section_seats_available'),
  crosslist_max_enrollment: integer('crosslist_max_enrollment'),
  crosslist_seats_available: integer('crosslist_seats_available')
});

export const prerequisites = sqliteTable('prerequisites', {
  id: integer('id').primaryKey(),
  course_id: integer('course_id').references(() => courses.id),
  type: text('type').notNull(), // 'required', 'recommended', 'alternative', 'additional'
  requirement: text('requirement').notNull()
});

export const cross_listings = sqliteTable('cross_listings', {
  id: integer('id').primaryKey(),
  course_id: integer('course_id').references(() => courses.id),
  cross_listed_course: text('cross_listed_course').notNull()
});

export const evaluation = sqliteTable('evaluation', {
  id: integer('id').primaryKey(),
  course_id: integer('course_id').references(() => courses.id),
  component: text('component').notNull(), // 'homework_assignments', 'exams', etc.
  percentage: text('percentage').notNull()
});

export const important_dates = sqliteTable('important_dates', {
  id: integer('id').primaryKey(),
  course_id: integer('course_id').references(() => courses.id),
  date_type: text('date_type').notNull(), // 'last_day_to_add', 'last_day_to_drop', etc.
  date_value: text('date_value').notNull()
});

export const soc_comments = sqliteTable('soc_comments', {
  id: integer('id').primaryKey(),
  course_id: integer('course_id').references(() => courses.id),
  comment: text('comment').notNull()
});


// ----------------------------
//
// OpenAlex Author Tables
//
// ----------------------------

export const openalex_authors = sqliteTable('openalex_authors', {
  id: integer('id').primaryKey(),
  openalex_id: text('openalex_id').notNull().unique(), // A5026024797
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

export const openalex_affiliations = sqliteTable('openalex_affiliations', {
  id: integer('id').primaryKey(),
  author_id: integer('author_id').references(() => openalex_authors.id),
  institution_id: text('institution_id'),
  institution_display_name: text('institution_display_name'),
  institution_ror: text('institution_ror'),
  institution_country_code: text('institution_country_code'),
  institution_type: text('institution_type'),
  years: text('years') // JSON array as text
});

export const openalex_topics = sqliteTable('openalex_topics', {
  id: integer('id').primaryKey(),
  author_id: integer('author_id').references(() => openalex_authors.id),
  topic_id: text('topic_id'),
  display_name: text('display_name'),
  score: real('score'),
  subfield_id: text('subfield_id'),
  subfield_display_name: text('subfield_display_name'),
  field_id: text('field_id'),
  field_display_name: text('field_display_name'),
  domain_id: text('domain_id'),
  domain_display_name: text('domain_display_name')
});

export const openalex_concepts = sqliteTable('openalex_concepts', {
  id: integer('id').primaryKey(),
  author_id: integer('author_id').references(() => openalex_authors.id),
  concept_id: text('concept_id'),
  wikidata: text('wikidata'),
  display_name: text('display_name'),
  level: integer('level'),
  score: real('score')
});

export const openalex_counts_by_year = sqliteTable('openalex_counts_by_year', {
  id: integer('id').primaryKey(),
  author_id: integer('author_id').references(() => openalex_authors.id),
  year: integer('year'),
  works_count: integer('works_count'),
  cited_by_count: integer('cited_by_count'),
  oa_works_count: integer('oa_works_count')
});

export const openalex_papers = sqliteTable('openalex_papers', {
  id: integer('id').primaryKey(),
  author_id: integer('author_id').references(() => openalex_authors.id),
  openalex_id: text('openalex_id').notNull(), // W2964039088
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

export const openalex_paper_authors = sqliteTable('openalex_paper_authors', {
  id: integer('id').primaryKey(),
  paper_id: integer('paper_id').references(() => openalex_papers.id),
  author_openalex_id: text('author_openalex_id'),
  author_name: text('author_name'),
  author_orcid: text('author_orcid'),
  is_corresponding: integer('is_corresponding'), // 0 or 1
  author_position: text('author_position'), // first, middle, last
  raw_affiliation_string: text('raw_affiliation_string'),
  institution_display_name: text('institution_display_name'),
  institution_country_code: text('institution_country_code')
});
