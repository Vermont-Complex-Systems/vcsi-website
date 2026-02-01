import * as v from 'valibot';
import { prerender } from '$app/server';
import { db } from "$lib/server/db/index.js"
import { eq, or, sql } from 'drizzle-orm';
import { openalex_authors, openalex_papers } from '$lib/server/db/schema.js';

import membersData from '$data/members.csv'
import groupsData from '$data/groups.csv'
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

    const titleGroups = new Map();
    for (const paper of papers) {
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
        const best = group.sort((a, b) => {
            const aIsPreprint = isPreprint(a);
            const bIsPreprint = isPreprint(b);
            if (aIsPreprint !== bIsPreprint) return aIsPreprint ? 1 : -1;
            return (b.cited_by_count || 0) - (a.cited_by_count || 0);
        })[0];
        deduplicated.push(best);
    }

    return deduplicated;
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
    const allPapers = await db.select().from(openalex_papers);

    return {
        name: "VCSI",
        bio: " is an interdisplinary research institute working on complex systems problems of all kinds.",
        openAlex: {
            works_count: allAuthors.reduce((sum, a) => sum + (a.works_count || 0), 0),
            cited_by_count: allAuthors.reduce((sum, a) => sum + (a.cited_by_count || 0), 0),
            h_index: Math.max(...allAuthors.map(a => a.h_index || 0))
        },
        papers: deduplicatePapers(allPapers.map(formatPaper))
    };
});

export const getMemberWithOpenAlex = prerender(
    v.string(),
    async (slug) => {
        const member = membersData.filter(d => d.id == slug);
        if (member.length === 0) return null;

        const memberData = member[0];

        if (slug === 'vcsi') {
            const allAuthors = await db.select().from(openalex_authors);
            return { ...memberData, openAlex: null, papers: [], allAuthors };
        }

        if (!memberData.openAlexId) return memberData;

        const authorData = await db.select()
            .from(openalex_authors)
            .where(eq(openalex_authors.openalex_id, memberData.openAlexId))
            .limit(1);

        const papers = await db.select()
            .from(openalex_papers)
            .where(eq(openalex_papers.author_openalex_id, memberData.openAlexId));

        return {
            ...memberData,
            openAlex: authorData.length > 0 ? authorData[0] : null,
            papers: deduplicatePapers(papers.map(formatPaper))
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
