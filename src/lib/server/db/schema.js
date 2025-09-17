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
