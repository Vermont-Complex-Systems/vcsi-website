import * as v from 'valibot';
import { error } from '@sveltejs/kit';
import { prerender } from '$app/server';
import { db } from "$lib/server/db/index.js"
import { eq, inArray, or, sql } from 'drizzle-orm';
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
    openalex_papers
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
    {dynamic: true}
);

// Helper function to safely parse JSON
function safeParse(value) {
    if (!value) return null;
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
}

export const getMemberWithOpenAlex = prerender(
    v.string(),
    async (slug) => {
        const member = await membersData.filter(d => d.id == slug)
        if (member.length === 0) {
            return null
        }
        
        const memberData = member[0];
        
        if (!memberData.openAlexId) {
            return memberData
        }
        
        // Get author data from database
        const authorData = await db.select()
            .from(openalex_authors)
            .where(eq(openalex_authors.openalex_id, memberData.openAlexId))
            .limit(1);
        
        // Get papers from database
        const papers = await db.select()
            .from(openalex_papers)
            .where(eq(openalex_papers.author_openalex_id, memberData.openAlexId));

        return {
            ...memberData,
            openAlex: authorData.length > 0 ? authorData[0] : null,
            papers: papers.map(paper => ({
                ...paper,
                is_open_access: Boolean(paper.is_open_access),
                concepts: safeParse(paper.concepts) || [],
                primary_location: safeParse(paper.primary_location) || [],
                topics: safeParse(paper.topics) || []
            }))
        }
    },
    { dynamic: true }
);


// --------------------------------- //
//
// Course-related remote functions
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
    {dynamic: true}
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
    {dynamic: true}
);

// --------------------------------- //
//
// Project papers remote functions
//
// --------------------------------- //

import massMutualPapersData from '$data/publications/mass-mutual.csv';
import tgirPapersData from '$data/publications/tgir.csv';

// Helper to normalize DOI for matching (handles different formats)
function normalizeDoi(doi) {
    if (!doi) return '';
    // Remove common prefixes and normalize
    return doi.toLowerCase()
        .replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')
        .replace(/^doi:/i, '')
        .trim();
}

export const getMassMutualPapers = prerender(async () => {
    const csvDois = massMutualPapersData.map(row => row.doi).filter(doi => doi && doi.trim());

    // Build OR conditions that match DOI regardless of prefix format
    const whereConditions = csvDois.flatMap(doi => {
        const normalized = normalizeDoi(doi);
        return [
            // Match with https://doi.org/ prefix
            sql`LOWER(${openalex_papers.doi}) = LOWER(${'https://doi.org/' + normalized})`,
            // Match with http://dx.doi.org/ prefix
            sql`LOWER(${openalex_papers.doi}) = LOWER(${'http://dx.doi.org/' + normalized})`,
            // Match without prefix
            sql`LOWER(${openalex_papers.doi}) = LOWER(${normalized})`,
            // Match with doi: prefix
            sql`LOWER(${openalex_papers.doi}) = LOWER(${'doi:' + normalized})`
        ];
    });

    const papers = await db.select()
        .from(openalex_papers)
        .where(or(...whereConditions));

    return papers.map(paper => ({
        ...paper,
        is_open_access: Boolean(paper.is_open_access),
        concepts: safeParse(paper.concepts) || [],
        primary_location: safeParse(paper.primary_location) || [],
        topics: safeParse(paper.topics) || []
    }));
});

export const getTgirPapers = prerender(async () => {
    const csvDois = tgirPapersData.map(row => row.doi).filter(doi => doi && doi.trim());

    // Build OR conditions that match DOI regardless of prefix format
    const whereConditions = csvDois.flatMap(doi => {
        const normalized = normalizeDoi(doi);
        return [
            // Match with https://doi.org/ prefix
            sql`LOWER(${openalex_papers.doi}) = LOWER(${'https://doi.org/' + normalized})`,
            // Match with http://dx.doi.org/ prefix
            sql`LOWER(${openalex_papers.doi}) = LOWER(${'http://dx.doi.org/' + normalized})`,
            // Match without prefix
            sql`LOWER(${openalex_papers.doi}) = LOWER(${normalized})`,
            // Match with doi: prefix
            sql`LOWER(${openalex_papers.doi}) = LOWER(${'doi:' + normalized})`
        ];
    });

    const papers = await db.select()
        .from(openalex_papers)
        .where(or(...whereConditions));

    return papers.map(paper => ({
        ...paper,
        is_open_access: Boolean(paper.is_open_access),
        concepts: safeParse(paper.concepts) || [],
        primary_location: safeParse(paper.primary_location) || [],
        topics: safeParse(paper.topics) || []
    }));
});
