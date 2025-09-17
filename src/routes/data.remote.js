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
    openalex_papers
} from '$lib/server/db/schema.js';

import membersData from '$data/members.csv'
import groupsData from '$data/groups.csv'
import papersData from '$data/openalex_papers.csv'
import authorsData from '$data/openalex_authors.csv'
  

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
        
        // Get both author data and papers
        const authorData = await authorsData.filter(d => d.openalex_id == memberData.openAlexId)[0]
        const papers = await papersData.filter(d => d.author_openalex_id == memberData.openAlexId)
        
        return {
            ...memberData,
            openAlex: authorData,
            papers: papers
        }
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
