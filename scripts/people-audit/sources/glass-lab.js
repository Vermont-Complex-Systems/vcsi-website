// Glass Brain Lab (https://www.uvm.edu/~brainlab/#team)
//
// Hand-edited one-page site on UVM's web server. The #team section has a
// "Team" heading and an "Alumni" heading, each followed by person cards
// (.team_area) holding the name (h3), role (span) and social links. The
// server's Last-Modified header is the file's edit date.

import { parse } from 'node-html-parser';

const PAGE = 'https://www.uvm.edu/~brainlab/';

// Section heading -> status. Cards under any other heading are skipped.
const SECTIONS = { Team: 'current', Alumni: 'alumni' };

// Roles that are lab staff rather than students or faculty
const STAFF = /specialist|coordinator|manager|technician/i;

export default {
	group: 'glass-lab',
	url: `${PAGE}#team`,

	async fetch() {
		const res = await fetch(PAGE);
		if (!res.ok) throw new Error(`${PAGE} responded ${res.status}`);
		const team = parse(await res.text()).querySelector('#team');
		if (!team) return { lastChanged: null, people: [] };

		const people = [];
		let status = null;
		// Headings and person cards, in page order
		for (const el of team.querySelectorAll('h2, .team_area')) {
			if (el.tagName === 'H2') {
				status = SECTIONS[el.text.trim()] || null;
				continue;
			}
			if (!status) continue;

			const name = el.querySelector('h3')?.text.trim();
			if (!name) continue;
			const role = el.querySelector('span')?.text.trim() || '';
			const img = el.querySelector('img')?.getAttribute('src');
			// First real link on the card (some are "javascript:void(0)" overlays)
			const link = el
				.querySelectorAll('a')
				.map((a) => a.getAttribute('href') || '')
				.find((href) => /^https?:/.test(href));

			people.push({
				name,
				role,
				status,
				...(STAFF.test(role) && { staff: true }),
				url: link || '',
				// Headshot on the card, a path relative to the page ("img/…")
				photo: img ? new URL(img, PAGE).href : ''
			});
		}

		const modified = res.headers.get('last-modified');
		return { lastChanged: modified ? new Date(modified) : null, people };
	}
};
