import * as v from 'valibot';
import { prerender } from '$app/server';
import { db } from "$lib/server/db/index.js"
import { eq, or, sql, inArray } from 'drizzle-orm';
import { openalex_authors, openalex_papers, paper_authors } from '$lib/server/db/schema.js';

import membersData from '$data/members.csv'
import groupsData from '$data/groups.csv'
import studentsData from '$data/students.csv'
import massMutualPapersData from '$data/publications/mass-mutual.csv';
import tgirPapersData from '$data/publications/tgir.csv';
import lemursPaperData from '$data/publications/lemurs.csv';

// --------------------------------- //
// Helper functions
// --------------------------------- //

function safeParse(value) {
    if (!value) return null;
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
}

function formatPaper(paper) {
    return {
        ...paper,
        is_open_access: Boolean(paper.is_open_access),
        concepts: safeParse(paper.concepts) || [],
        primary_location: safeParse(paper.primary_location) || [],
        topics: safeParse(paper.topics) || []
    };
}

function normalizeDoi(doi) {
    if (!doi) return '';
    return doi.toLowerCase()
        .replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')
        .replace(/^doi:/i, '')
        .trim();
}

function deduplicatePapers(papers) {
    const normalizeTitle = (title) => {
        if (!title) return '';
        return title.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    };

    const isPreprint = (paper) => {
        const location = paper.primary_location;
        if (!location || typeof location === 'string') {
            try {
                const parsed = typeof location === 'string' ? JSON.parse(location) : location;
                return parsed?.source?.type === 'repository';
            } catch {
                return false;
            }
        }
        return location?.source?.type === 'repository';
    };

    // First pass: dedupe by openalex_id (handles JOIN duplicates from co-authors)
    const byId = new Map();
    for (const paper of papers) {
        if (!byId.has(paper.openalex_id)) {
            byId.set(paper.openalex_id, paper);
        }
    }
    const uniqueById = Array.from(byId.values());

    // Second pass: group by normalized title (handles arXiv vs published versions)
    const titleGroups = new Map();
    for (const paper of uniqueById) {
        const normalizedTitle = normalizeTitle(paper.title);
        if (!titleGroups.has(normalizedTitle)) {
            titleGroups.set(normalizedTitle, []);
        }
        titleGroups.get(normalizedTitle).push(paper);
    }

    const deduplicated = [];
    for (const group of titleGroups.values()) {
        if (group.length === 1) {
            deduplicated.push(group[0]);
            continue;
        }

        // Sort to pick canonical version: prefer published (non-preprint), then highest citations
        const sorted = group.sort((a, b) => {
            const aIsPreprint = isPreprint(a);
            const bIsPreprint = isPreprint(b);
            if (aIsPreprint !== bIsPreprint) return aIsPreprint ? 1 : -1;
            return (b.cited_by_count || 0) - (a.cited_by_count || 0);
        });

        const canonical = sorted[0];

        // Consolidate: sum citations, merge OA status
        const consolidated = {
            ...canonical,
            cited_by_count: group.reduce((sum, p) => sum + (p.cited_by_count || 0), 0),
            is_open_access: group.some(p => p.is_open_access)
        };

        deduplicated.push(consolidated);
    }

    return deduplicated;
}

async function getPapersByAuthorIds(openAlexIds) {
    if (!openAlexIds || openAlexIds.length === 0) return [];

    // Join papers with junction table to find papers by author IDs
    const results = await db.select({
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
        referenced_works_count: openalex_papers.referenced_works_count,
        created_date: openalex_papers.created_date,
        updated_date: openalex_papers.updated_date
    })
        .from(openalex_papers)
        .innerJoin(paper_authors, eq(openalex_papers.openalex_id, paper_authors.paper_openalex_id))
        .where(inArray(paper_authors.author_openalex_id, openAlexIds));

    return deduplicatePapers(results.map(formatPaper));
}

async function getPapersByDois(csvData) {
    const csvDois = csvData.map(row => row.doi).filter(doi => doi && doi.trim());

    const whereConditions = csvDois.flatMap(doi => {
        const normalized = normalizeDoi(doi);
        return [
            sql`LOWER(${openalex_papers.doi}) = LOWER(${'https://doi.org/' + normalized})`,
            sql`LOWER(${openalex_papers.doi}) = LOWER(${'http://dx.doi.org/' + normalized})`,
            sql`LOWER(${openalex_papers.doi}) = LOWER(${normalized})`,
            sql`LOWER(${openalex_papers.doi}) = LOWER(${'doi:' + normalized})`
        ];
    });

    const papers = await db.select()
        .from(openalex_papers)
        .where(or(...whereConditions));

    return deduplicatePapers(papers.map(formatPaper));
}

// --------------------------------- //
// Member & Group exports
// --------------------------------- //

export const getMembers = prerender(async () => membersData);

export const getGroups = prerender(async () => groupsData);

export const getMember = prerender(
    v.string(),
    async (slug) => membersData.filter(d => d.id == slug),
    { dynamic: true }
);

export const getGroup = prerender(
    v.string(),
    async (slug) => groupsData.filter(d => d.id == slug),
    { dynamic: true }
);

export const getGroupWithPapers = prerender(
    v.string(),
    async (slug) => {
        const group = groupsData.filter(d => d.id == slug);
        if (group.length === 0) return null;

        const groupData = group[0];

        // Collect openAlexIds from PIs
        const piIds = (groupData.PI || '').split(' ').filter(Boolean);
        const piOpenAlexIds = piIds
            .map(id => membersData.find(m => m.id === id)?.openAlexId)
            .filter(Boolean);

        // Collect openAlexIds from students in this group
        const groupStudents = studentsData.filter(s => s.primaryAffiliation === slug);
        const studentOpenAlexIds = groupStudents
            .map(s => s.openAlexId)
            .filter(Boolean);

        // Combine all IDs and fetch papers
        const allOpenAlexIds = [...new Set([...piOpenAlexIds, ...studentOpenAlexIds])];
        const papers = await getPapersByAuthorIds(allOpenAlexIds);

        return {
            ...groupData,
            papers
        };
    },
    { dynamic: true }
);

// --------------------------------- //
// OpenAlex exports
// --------------------------------- //

export const getAllAuthors = prerender(async () => {
    return db.select()
        .from(openalex_authors)
        .orderBy(openalex_authors.cited_by_count);
});

export const getAllAuthorsWithPapers = prerender(async () => {
    const allAuthors = await db.select().from(openalex_authors);
    const allIds = allAuthors.map(a => a.openalex_id).filter(Boolean);
    const papers = await getPapersByAuthorIds(allIds);

    return {
        name: "VCSI",
        bio: " is an interdisplinary research institute working on complex systems problems of all kinds.",
        openAlex: {
            works_count: allAuthors.reduce((sum, a) => sum + (a.works_count || 0), 0),
            cited_by_count: allAuthors.reduce((sum, a) => sum + (a.cited_by_count || 0), 0),
            h_index: Math.max(...allAuthors.map(a => a.h_index || 0))
        },
        papers
    };
});

export const getMemberWithOpenAlex = prerender(
    v.string(),
    async (slug) => {
        const member = membersData.filter(d => d.id == slug);
        if (member.length === 0) return null;

        const memberData = member[0];
        const memberGroups = groupsData.filter(g => g.PI && g.PI.split(' ').includes(slug));

        if (slug === 'vcsi') {
            const allAuthors = await db.select().from(openalex_authors);
            return { ...memberData, openAlex: null, papers: [], allAuthors, groups: [] };
        }

        if (!memberData.openAlexId) return { ...memberData, groups: memberGroups };

        const [authorData, papers] = await Promise.all([
            db.select()
                .from(openalex_authors)
                .where(eq(openalex_authors.openalex_id, memberData.openAlexId))
                .limit(1),
            getPapersByAuthorIds([memberData.openAlexId])
        ]);

        return {
            ...memberData,
            openAlex: authorData.length > 0 ? authorData[0] : null,
            papers,
            groups: memberGroups
        };
    },
    { dynamic: true }
);

// --------------------------------- //
// Project papers exports
// --------------------------------- //

export const getMassMutualPapers = prerender(async () => getPapersByDois(massMutualPapersData));
export const getTgirPapers = prerender(async () => getPapersByDois(tgirPapersData));
export const getLemurPapers = prerender(async () => getPapersByDois(lemursPaperData));

// --------------------------------- //
// Recent papers (for homepage)
// --------------------------------- //

export const getRecentPapers = prerender(async () => {
    const activeMembers = membersData.filter(m => m.openAlexId && m.status === 'active');
    const activeIds = activeMembers.map(m => m.openAlexId.trim());
    const papers = await getPapersByAuthorIds(activeIds);

    // Build paper → VCSI authors mapping via junction table + active members
    const allLinks = await db.select().from(paper_authors);
    const openAlexToMember = new Map(
        activeMembers
            .map(m => [m.openAlexId.trim(), { name: m.name, slug: m.id, position: m.position }])
    );

    const paperAuthorsMap = new Map();
    for (const link of allLinks) {
        const member = openAlexToMember.get(link.author_openalex_id);
        if (!member) continue;
        if (!paperAuthorsMap.has(link.paper_openalex_id)) {
            paperAuthorsMap.set(link.paper_openalex_id, []);
        }
        const authors = paperAuthorsMap.get(link.paper_openalex_id);
        if (!authors.some(a => a.slug === member.slug)) {
            authors.push(member);
        }
    }

    // Filter to papers from the last 30 days and attach authors
    const now = new Date();
    const cutoff = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const recent = papers
        .filter(p => p.publication_date && new Date(p.publication_date) >= cutoff)
        .map(p => ({ ...p, authors: paperAuthorsMap.get(p.openalex_id) || [] }))
        .sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date));

    // Pick a random highlighted paper (determined at build time)
    const highlighted = recent.length > 0
        ? recent[Math.floor(Math.random() * recent.length)]
        : null;

    return { papers: recent, highlighted };
});
