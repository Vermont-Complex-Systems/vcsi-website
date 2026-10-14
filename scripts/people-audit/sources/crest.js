// CREST, Matthew Price's lab (https://www.crestresearch.org/team)
//
// Google Sites. Current members are on /team, former ones on /team/alumni.
// On both, each role is an <h2> ("Graduate Students", "Research assistants")
// and each person a photo followed by an <h3> with their name. The "Page
// updated" date is filled in by JavaScript, so there's no freshness date.

import { parse } from 'node-html-parser';

const PAGE = 'https://www.crestresearch.org/team';
const ALUMNI = 'https://www.crestresearch.org/team/alumni';

// Sections with people in them -> role. Community partners aren't lab members.
const SECTIONS = {
	Faculty: { role: 'Faculty' },
	'Graduate Students': { role: 'Graduate student' },
	'Research Coordinators': { role: 'Research coordinator', staff: true },
	'Research assistants': { role: 'Research assistant' }
};

async function readPage(url, status) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${url} responded ${res.status}`);
	const root = parse(await res.text());

	const people = [];
	let section = null;
	let photo = '';
	for (const el of root.querySelectorAll('h2, h3, img')) {
		if (el.tagName === 'H2') {
			section = SECTIONS[el.text.trim()] || null;
			photo = '';
		} else if (el.tagName === 'IMG') {
			// Uploaded photos are served from googleusercontent; skip site icons
			const src = el.getAttribute('src') || '';
			if (src.includes('googleusercontent.com')) photo = src.replace(/=w\d+$/, '=w600');
		} else if (section) {
			people.push({
				name: el.text.trim().replace(/^Dr\.\s+/, ''),
				role: section.role,
				status,
				...(section.staff ? { staff: true } : {}),
				photo
			});
			photo = '';
		}
	}
	return people;
}

export default {
	group: 'crest',
	url: PAGE,

	async fetch() {
		const people = [...(await readPage(PAGE, 'current')), ...(await readPage(ALUMNI, 'alumni'))];
		return { lastChanged: null, people };
	}
};
