#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { db } from '../src/lib/server/db/index.js';
import { eq } from 'drizzle-orm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

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
import { 
  courses, 
  sections, 
  enrollment, 
  prerequisites, 
  cross_listings, 
  evaluation, 
  important_dates, 
  soc_comments 
} from '../src/lib/server/db/schema.js';



// Fetch course data from UVM API
async function fetchCourseData(courseRow) {
  const payload = {
    group: courseRow.group,
    key: courseRow.key,
    srcdb: courseRow.srcdb,
    matched: courseRow.matched
  };
  
  console.log(`🌐 Fetching: ${courseRow.course_code} ${courseRow.section} (CRN: ${courseRow.crn})`);
  console.log(`📤 Payload:`, payload);
  
  try {
    // Try POST with JSON body first
    let response = await fetch('https://soc.uvm.edu/api/?page=fose&route=details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; VCSI-Bot/1.0)',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      // Try as form data if JSON doesn't work
      const formData = new URLSearchParams();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      response = await fetch('https://soc.uvm.edu/api/?page=fose&route=details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (compatible; VCSI-Bot/1.0)',
          'Accept': 'application/json'
        },
        body: formData
      });
    }
    
    if (!response.ok) {
      // Try as URL parameters if POST doesn't work
      const params = new URLSearchParams(payload);
      response = await fetch(`https://soc.uvm.edu/api/?page=fose&route=details&${params}`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; VCSI-Bot/1.0)',
          'Accept': 'application/json'
        }
      });
    }
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.fatal) {
      throw new Error(`API Error: ${data.fatal}`);
    }
    
    console.log(`📥 Response keys:`, Object.keys(data));
    return data;
  } catch (error) {
    console.error(`❌ Failed to fetch ${courseRow.course_code}: ${error.message}`);
    return null;
  }
}

// Helper function to handle arrays in prerequisites and cross_listings
function normalizeArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return [value];
  return [];
}

// Extract course data from API response
function extractCourseData(apiData, courseRow) {
  console.log('📝 API Response structure:', Object.keys(apiData));
  
  // Extract instructor info from HTML field
  let instructorName = null;
  let instructorEmail = null;
  
  if (apiData.instructordetail_html) {
    // Simple HTML parsing to extract instructor name and email
    const instructorMatch = apiData.instructordetail_html.match(/<div class="instructor-detail">([^<]+)<\/div>/);
    if (instructorMatch) {
      instructorName = instructorMatch[1].trim();
    }
    
    const emailMatch = apiData.instructordetail_html.match(/mailto:([^"]+)"/);
    if (emailMatch) {
      instructorEmail = emailMatch[1];
    }
  }
  
  // Extract meeting time from HTML field
  let meetingTime = null;
  let location = null;
  if (apiData.meeting_html) {
    const meetingMatch = apiData.meeting_html.match(/<div class="meet">([^<]+)/);
    if (meetingMatch) {
      const meetingText = meetingMatch[1];
      const timeMatch = meetingText.match(/^([^<]+?)(?:\s*<span|$)/);
      if (timeMatch) {
        meetingTime = timeMatch[1].trim();
      }
      
      const locationMatch = meetingText.match(/in ([^<]+)</);
      if (locationMatch) {
        location = locationMatch[1].trim();
      }
    }
  }
  
  return {
    course_code: courseRow.course_code,
    title: apiData.title || `Course ${courseRow.course_code}`,
    section: courseRow.section,
    crn: courseRow.crn,
    credit_hours: apiData.hours_html ? apiData.hours_html.replace(/<[^>]*>/g, '') : null,
    instruction_method: apiData.instructional_method || 'Lecture',
    meeting_time: meetingTime,
    location: location,
    dates: null,
    instructor: {
      name: instructorName,
      email: instructorEmail
    },
    enrollment: {
      section_enrollment: parseInt(apiData.section_enrollment) || null,
      max_section_enrollment: null,
      section_seats_available: null
    },
    status: apiData.stat || apiData.permission_required,
    cross_listed_with: apiData.xlist ? [apiData.xlist] : [],
    catalog_description: apiData.description || null,
    prerequisites: {},
    evaluation: {},
    important_dates: {},
    soc_comments: apiData.clssnotes || null,
    last_updated: new Date().toISOString()
  };
}

async function populateDatabase() {
  console.log('🗃️  Starting database population from UVM API...');
  
  // Read CSV file
  const csvPath = join(projectRoot, 'src/data/course-urls.csv');
  const csvContent = readFileSync(csvPath, 'utf8');
  const courseRows = parseCSV(csvContent);
  
  console.log(`📚 Found ${courseRows.length} courses in CSV`);

  // Check which courses already exist
  const existingCourses = await db.select({ 
    course_code: courses.course_code,
    crn: sections.crn,
    last_updated: courses.last_updated
  })
  .from(courses)
  .leftJoin(sections, eq(courses.id, sections.course_id));
  
  const existingCRNs = new Set(existingCourses.map(c => c.crn));
  console.log(`📋 Found ${existingCRNs.size} existing courses in database`);

  for (const courseRow of courseRows) {
    // Skip if course already exists (unless it's old)
    if (existingCRNs.has(courseRow.crn)) {
      const existingCourse = existingCourses.find(c => c.crn === courseRow.crn);
      const lastUpdated = new Date(existingCourse.last_updated);
      const daysSinceUpdate = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSinceUpdate < 1) { // Skip if updated within last day
        console.log(`⏭️  Skipping ${courseRow.course_code} ${courseRow.section} (recently updated)`);
        continue;
      } else {
        console.log(`🔄 Updating ${courseRow.course_code} ${courseRow.section} (${daysSinceUpdate.toFixed(1)} days old)`);
      }
    }
    try {
      // Fetch data from API
      const apiData = await fetchCourseData(courseRow);
      
      if (!apiData) {
        console.log(`⏭️  Skipping ${courseRow.course_code} ${courseRow.section} due to API error`);
        continue;
      }
      
      // Transform API data to our format
      const courseData = extractCourseData(apiData, courseRow);
      
      console.log(`📖 Processing: ${courseData.course_code} - ${courseData.title}`);

      // Insert course
      const [insertedCourse] = await db.insert(courses).values({
        course_code: courseData.course_code,
        title: courseData.title,
        credit_hours: typeof courseData.credit_hours === 'number' 
          ? courseData.credit_hours.toString() 
          : courseData.credit_hours,
        instruction_method: courseData.instruction_method,
        catalog_description: courseData.catalog_description,
        section_description: courseData.section_description,
        course_structure: courseData.course_structure,
        learning_approach: courseData.learning_approach,
        programming_requirements: courseData.programming_requirements,
        programming_language: courseData.programming_language,
        learning_objectives: Array.isArray(courseData.learning_objectives) 
          ? courseData.learning_objectives.join('; ') 
          : courseData.learning_objectives,
        last_updated: courseData.last_updated
      }).returning({ id: courses.id });

      const courseId = insertedCourse.id;

      // Insert section data
      const [insertedSection] = await db.insert(sections).values({
        course_id: courseId,
        section: courseData.section,
        crn: courseData.crn,
        meeting_time: courseData.meeting_time,
        location: courseData.location,
        dates: courseData.dates,
        instructor_name: courseData.instructor?.name,
        instructor_email: courseData.instructor?.email,
        status: courseData.status,
        start_date: null,
        end_date: null
      }).returning({ id: sections.id });

      // Insert enrollment data
      if (courseData.enrollment) {
        await db.insert(enrollment).values({
          section_id: insertedSection.id,
          section_enrollment: courseData.enrollment.section_enrollment,
          max_section_enrollment: courseData.enrollment.max_section_enrollment,
          section_seats_available: courseData.enrollment.section_seats_available,
          crosslist_max_enrollment: courseData.enrollment.crosslist_max_enrollment,
          crosslist_seats_available: courseData.enrollment.crosslist_seats_available
        });
      }

      // Insert prerequisites
      if (courseData.prerequisites) {
        const prereqs = courseData.prerequisites;
        
        if (prereqs.required) {
          for (const req of normalizeArray(prereqs.required)) {
            await db.insert(prerequisites).values({
              course_id: courseId,
              type: 'required',
              requirement: req
            });
          }
        }

        if (prereqs.recommended) {
          for (const req of normalizeArray(prereqs.recommended)) {
            await db.insert(prerequisites).values({
              course_id: courseId,
              type: 'recommended',
              requirement: req
            });
          }
        }

        if (prereqs.alternative) {
          await db.insert(prerequisites).values({
            course_id: courseId,
            type: 'alternative',
            requirement: prereqs.alternative
          });
        }

        if (prereqs.additional) {
          await db.insert(prerequisites).values({
            course_id: courseId,
            type: 'additional',
            requirement: prereqs.additional
          });
        }
      }

      // Insert cross listings
      if (courseData.cross_listed_with) {
        for (const crossListed of normalizeArray(courseData.cross_listed_with)) {
          await db.insert(cross_listings).values({
            course_id: courseId,
            cross_listed_course: crossListed
          });
        }
      }

      // Insert evaluation components
      if (courseData.evaluation) {
        for (const [component, percentage] of Object.entries(courseData.evaluation)) {
          await db.insert(evaluation).values({
            course_id: courseId,
            component: component,
            percentage: percentage
          });
        }
      }

      // Insert important dates
      if (courseData.important_dates) {
        for (const [dateType, dateValue] of Object.entries(courseData.important_dates)) {
          await db.insert(important_dates).values({
            course_id: courseId,
            date_type: dateType,
            date_value: dateValue
          });
        }
      }

      // Insert SOC comments
      if (courseData.soc_comments) {
        await db.insert(soc_comments).values({
          course_id: courseId,
          comment: courseData.soc_comments
        });
      }

      console.log(`✅ Completed: ${courseData.course_code} ${courseData.section}`);

      // Add a small delay to be respectful to the API
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`❌ Error processing ${courseRow.course_code} ${courseRow.section}:`, error);
    }
  }

  console.log('\n🎉 Database population complete!');
  
  // Show summary
  const courseCount = await db.select().from(courses);
  const sectionCount = await db.select().from(sections);
  console.log(`📊 Summary: ${courseCount.length} courses, ${sectionCount.length} sections`);
  
}

// Run the script
populateDatabase().catch(console.error);