import * as v from 'valibot';
import { error } from '@sveltejs/kit';
import { prerender } from '$app/server';
import { db } from "$lib/server/db/index.js"
import { eq } from 'drizzle-orm';
import { 
    courses, 
    sections, 
    enrollment, 
    prerequisites, 
    cross_listings, 
    evaluation, 
    important_dates, 
    soc_comments,
    openalex_authors,
    openalex_affiliations,
    openalex_topics,
    openalex_concepts,
    openalex_counts_by_year,
    openalex_papers,
    openalex_paper_authors
} from '$lib/server/db/schema.js';

import membersData from '$data/members.csv'
import groupsData from '$data/groups.csv'

export const getMembers = prerender(async () => {
    return await membersData
});

export const getGroups = prerender(async () => {
    return await groupsData
});

export const getMember = prerender(
    v.string(),
    async (slug) => {
        return await membersData.filter(d => d.id == slug)
    },
    { dynamic: true }
);

export const getGroup = prerender(
    v.string(),
    async (slug) => {
        return await groupsData.filter(d => d.id == slug)
    },
    { dynamic: true }
);

// --------------------------------- //
//
// Course-related remote functions (DB)
//
// --------------------------------- //

export const getCourses = prerender(async () => {
    const coursesWithSections = await db.select({
        id: courses.id,
        course_code: courses.course_code,
        title: courses.title,
        credit_hours: courses.credit_hours,
        instruction_method: courses.instruction_method,
        catalog_description: courses.catalog_description,
        last_updated: courses.last_updated,
        section: sections.section,
        crn: sections.crn,
        meeting_time: sections.meeting_time,
        location: sections.location,
        instructor_name: sections.instructor_name,
        instructor_email: sections.instructor_email,
        status: sections.status
    })
    .from(courses)
    .leftJoin(sections, eq(courses.id, sections.course_id))
    .orderBy(courses.course_code, sections.section);
    
    return coursesWithSections;
});

export const getCourse = prerender(
    v.string(),
    async (courseCode) => {
        const courseData = await db.select()
            .from(courses)
            .where(eq(courses.course_code, courseCode))
            .limit(1);
        
        if (courseData.length === 0) {
            throw error(404, 'Course not found');
        }
        
        const course = courseData[0];
        
        // Get all sections for this course
        const courseSections = await db.select()
            .from(sections)
            .where(eq(sections.course_id, course.id));
        
        // Get enrollment data for each section
        const enrollmentData = await db.select()
            .from(enrollment)
            .leftJoin(sections, eq(enrollment.section_id, sections.id))
            .where(eq(sections.course_id, course.id));
        
        // Get prerequisites
        const prereqs = await db.select()
            .from(prerequisites)
            .where(eq(prerequisites.course_id, course.id));
        
        // Get cross listings
        const crossListings = await db.select()
            .from(cross_listings)
            .where(eq(cross_listings.course_id, course.id));
        
        // Get evaluation components
        const evaluationData = await db.select()
            .from(evaluation)
            .where(eq(evaluation.course_id, course.id));
        
        // Get important dates
        const importantDates = await db.select()
            .from(important_dates)
            .where(eq(important_dates.course_id, course.id));
        
        // Get SOC comments
        const socComments = await db.select()
            .from(soc_comments)
            .where(eq(soc_comments.course_id, course.id));
        
        return {
            ...course,
            sections: courseSections,
            enrollment: enrollmentData,
            prerequisites: prereqs,
            cross_listings: crossListings,
            evaluation: evaluationData,
            important_dates: importantDates,
            soc_comments: socComments
        };
    },
    { dynamic: true }
);

export const getCourseByCRN = prerender(
    v.string(),
    async (crn) => {
        const courseData = await db.select({
            id: courses.id,
            course_code: courses.course_code,
            title: courses.title,
            credit_hours: courses.credit_hours,
            instruction_method: courses.instruction_method,
            catalog_description: courses.catalog_description,
            section_description: courses.section_description,
            last_updated: courses.last_updated,
            section: sections.section,
            crn: sections.crn,
            meeting_time: sections.meeting_time,
            location: sections.location,
            instructor_name: sections.instructor_name,
            instructor_email: sections.instructor_email,
            status: sections.status
        })
        .from(courses)
        .leftJoin(sections, eq(courses.id, sections.course_id))
        .where(eq(sections.crn, crn))
        .limit(1);

        if (courseData.length === 0) {
            throw error(404, 'Course not found');
        }

        return courseData[0];
    },
    { dynamic: true }
);

// --------------------------------- //
//
// OpenAlex-related remote functions (DB)
//
// --------------------------------- //

export const getOpenAlexAuthors = prerender(async () => {
    const authors = await db.select({
        id: openalex_authors.id,
        openalex_id: openalex_authors.openalex_id,
        display_name: openalex_authors.display_name,
        works_count: openalex_authors.works_count,
        cited_by_count: openalex_authors.cited_by_count,
        h_index: openalex_authors.h_index,
        i10_index: openalex_authors.i10_index,
        two_year_mean_citedness: openalex_authors.two_year_mean_citedness,
        last_updated: openalex_authors.last_updated
    })
    .from(openalex_authors)
    .orderBy(openalex_authors.display_name);
    
    return authors;
});

export const getOpenAlexAuthor = prerender(
    v.string(),
    async (openAlexId) => {
        const authorData = await db.select()
            .from(openalex_authors)
            .where(eq(openalex_authors.openalex_id, openAlexId))
            .limit(1);
        
        if (authorData.length === 0) {
            throw error(404, 'Author not found');
        }
        
        const author = authorData[0];
        
        // Get all affiliations for this author
        const affiliations = await db.select()
            .from(openalex_affiliations)
            .where(eq(openalex_affiliations.author_id, author.id));
        
        // Get topics for this author
        const topics = await db.select()
            .from(openalex_topics)
            .where(eq(openalex_topics.author_id, author.id))
            .orderBy(openalex_topics.score);
        
        // Get concepts for this author
        const concepts = await db.select()
            .from(openalex_concepts)
            .where(eq(openalex_concepts.author_id, author.id))
            .orderBy(openalex_concepts.score);
        
        // Get yearly counts for this author
        const countsByYear = await db.select()
            .from(openalex_counts_by_year)
            .where(eq(openalex_counts_by_year.author_id, author.id))
            .orderBy(openalex_counts_by_year.year);
        
        // Get papers for this author with their co-authors
        const papers = await db.select({
            id: openalex_papers.id,
            openalex_id: openalex_papers.openalex_id,
            doi: openalex_papers.doi,
            title: openalex_papers.title,
            publication_year: openalex_papers.publication_year,
            publication_date: openalex_papers.publication_date,
            type: openalex_papers.type,
            cited_by_count: openalex_papers.cited_by_count,
            is_open_access: openalex_papers.is_open_access,
            primary_location: openalex_papers.primary_location,
            abstract: openalex_papers.abstract,
            language: openalex_papers.language,
            concepts: openalex_papers.concepts,
            topics: openalex_papers.topics,
            keywords: openalex_papers.keywords,
            grants: openalex_papers.grants,
            referenced_works_count: openalex_papers.referenced_works_count
        })
        .from(openalex_papers)
        .where(eq(openalex_papers.author_id, author.id))
        .orderBy(openalex_papers.publication_year, openalex_papers.cited_by_count);
        
        return {
            ...author,
            display_name_alternatives: JSON.parse(author.display_name_alternatives || '[]'),
            affiliations: affiliations.map(aff => ({
                ...aff,
                years: JSON.parse(aff.years || '[]')
            })),
            topics,
            concepts,
            counts_by_year: countsByYear,
            papers: papers.map(paper => ({
                ...paper,
                primary_location: JSON.parse(paper.primary_location || '{}'),
                concepts: JSON.parse(paper.concepts || '[]'),
                topics: JSON.parse(paper.topics || '[]'),
                keywords: JSON.parse(paper.keywords || '[]'),
                grants: JSON.parse(paper.grants || '[]'),
                is_open_access: Boolean(paper.is_open_access)
            }))
        };
    },
    { dynamic: true }
);

export const getMemberWithOpenAlex = prerender(
    v.string(),
    async (slug) => {
        const member = await membersData.filter(d => d.id == slug);
        
        if (member.length === 0) {
            throw error(404, 'Member not found');
        }
        
        const memberData = member[0];
        
        // If member has OpenAlex ID, fetch the data
        if (memberData.openAlexId) {
            try {
                const openAlexData = await getOpenAlexAuthor(memberData.openAlexId);
                return {
                    ...memberData,
                    openAlex: openAlexData
                };
            } catch (err) {
                // If OpenAlex data not found, just return member data
                return memberData;
            }
        }
        
        return memberData;
    },
    { dynamic: true }
);

// --------------------------------- //
//
// Papers-related remote functions (DB)
//
// --------------------------------- //

export const getAuthorPapers = prerender(
    v.string(),
    async (openAlexId) => {
        // First get the author
        const authorData = await db.select({ id: openalex_authors.id })
            .from(openalex_authors)
            .where(eq(openalex_authors.openalex_id, openAlexId))
            .limit(1);
        
        if (authorData.length === 0) {
            throw error(404, 'Author not found');
        }
        
        const authorId = authorData[0].id;
        
        // Get papers with their co-authors
        const papers = await db.select({
            id: openalex_papers.id,
            openalex_id: openalex_papers.openalex_id,
            doi: openalex_papers.doi,
            title: openalex_papers.title,
            publication_year: openalex_papers.publication_year,
            publication_date: openalex_papers.publication_date,
            type: openalex_papers.type,
            cited_by_count: openalex_papers.cited_by_count,
            is_open_access: openalex_papers.is_open_access,
            primary_location: openalex_papers.primary_location,
            abstract: openalex_papers.abstract
        })
        .from(openalex_papers)
        .where(eq(openalex_papers.author_id, authorId))
        .orderBy(openalex_papers.publication_year, openalex_papers.cited_by_count);
        
        // Get co-authors for each paper
        const papersWithAuthors = [];
        for (const paper of papers) {
            const coAuthors = await db.select()
                .from(openalex_paper_authors)
                .where(eq(openalex_paper_authors.paper_id, paper.id));
            
            papersWithAuthors.push({
                ...paper,
                primary_location: JSON.parse(paper.primary_location || '{}'),
                is_open_access: Boolean(paper.is_open_access),
                co_authors: coAuthors
            });
        }
        
        return papersWithAuthors;
    },
    { dynamic: true }
);

export const getRecentPapers = prerender(async () => {
    const recentPapers = await db.select({
        id: openalex_papers.id,
        title: openalex_papers.title,
        publication_year: openalex_papers.publication_year,
        publication_date: openalex_papers.publication_date,
        cited_by_count: openalex_papers.cited_by_count,
        is_open_access: openalex_papers.is_open_access,
        doi: openalex_papers.doi,
        author_name: openalex_authors.display_name,
        author_openalex_id: openalex_authors.openalex_id
    })
    .from(openalex_papers)
    .leftJoin(openalex_authors, eq(openalex_papers.author_id, openalex_authors.id))
    .where(eq(openalex_papers.publication_year, new Date().getFullYear()))
    .orderBy(openalex_papers.publication_date)
    .limit(20);
    
    return recentPapers.map(paper => ({
        ...paper,
        is_open_access: Boolean(paper.is_open_access)
    }));
});

export const getTopCitedPapers = prerender(async () => {
    const topPapers = await db.select({
        id: openalex_papers.id,
        title: openalex_papers.title,
        publication_year: openalex_papers.publication_year,
        cited_by_count: openalex_papers.cited_by_count,
        is_open_access: openalex_papers.is_open_access,
        doi: openalex_papers.doi,
        author_name: openalex_authors.display_name,
        author_openalex_id: openalex_authors.openalex_id
    })
    .from(openalex_papers)
    .leftJoin(openalex_authors, eq(openalex_papers.author_id, openalex_authors.id))
    .orderBy(openalex_papers.cited_by_count)
    .limit(20);
    
    return topPapers.map(paper => ({
        ...paper,
        is_open_access: Boolean(paper.is_open_access)
    }));
});
