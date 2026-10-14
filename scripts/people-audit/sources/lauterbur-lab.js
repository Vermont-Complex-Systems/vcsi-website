// Lauterbur EvoEco Lab (https://www.lauterbur.org/people.html)
//
// Weebly site (lauterbur.weebly.com redirects here), linked from Elise
// Lauterbur's GitHub profile. Under the "Lab Members" heading, each person
// sits in their own column: a photo, a heading (h2) with their name, then a
// paragraph whose bold first line is their role. There is no alumni section
// yet; SECTIONS lists the headings we'd expect if one appears.
//
// Weebly serves the page with Last-Modified set to the request time, so it
// tells us nothing. Instead we use the newest photo upload: Weebly stamps
// each image URL with its upload time ("photo.jpg?1760457600"). It's a lower
// bound, since text-only edits leave no trace.

import { parse } from 'node-html-parser';

const PAGE = 'https://www.lauterbur.org/people.html';

// Section heading -> status. Headings outside these sections are skipped.
const SECTIONS = {
	'Lab Members': 'current',
	Alumni: 'alumni',
	'Lab Alumni': 'alumni',
	'Former Lab Members': 'alumni'
};

// Headings inside "Lab Members" that aren't people
const NOT_PEOPLE = new Set(['The Menagerie', 'You?']);

export default {
	group: 'lauterbur-lab',
	url: PAGE,

	async fetch() {
		const res = await fetch(PAGE);
		if (!res.ok) throw new Error(`${PAGE} responded ${res.status}`);
		const html = await res.text();
		const root = parse(html);

		const people = [];
		let status = null;
		let pending = null; // name heading waiting for its role paragraph
		let image = null; // last photo seen, and the column it was in
		// Photos, headings and paragraphs, in page order
		for (const el of root.querySelectorAll(
			'.wsite-image img, h2.wsite-content-title, .paragraph'
		)) {
			if (el.tagName === 'IMG') {
				image = { src: el.getAttribute('src'), column: el.closest('td') };
				continue;
			}
			if (el.tagName === 'H2') {
				const text = el.text.replace(/\s+/g, ' ').trim();
				if (text in SECTIONS) {
					status = SECTIONS[text];
					pending = null;
				} else if (status && !NOT_PEOPLE.has(text)) {
					// The photo belongs to this person only if it's in their column.
					// This is the cropped headshot the page shows; Weebly also keeps
					// the uncropped upload (…_orig.jpg), which isn't a headshot.
					const own = image && image.column && image.column === el.closest('td');
					pending = { name: text, photo: own ? new URL(image.src, PAGE).href : '' };
				} else {
					pending = null;
				}
				image = null;
				continue;
			}
			if (!pending) continue;

			people.push({
				// "M. Elise Lauterbur" -> "Elise Lauterbur", the name in our sheets
				name: pending.name.replace(/^[A-Z]\.\s+/, ''),
				role: el.querySelector('strong')?.text.replace(/\s+/g, ' ').trim() || '',
				status,
				photo: pending.photo
			});
			pending = null;
		}

		// Newest image upload time, in seconds since 1970
		const stamps = [...html.matchAll(/\/(?:published|editor)\/[^"?]+\?(\d{9,10})/g)].map(
			(m) => +m[1]
		);
		const lastChanged = stamps.length ? new Date(Math.max(...stamps) * 1000) : null;

		return { lastChanged, people };
	}
};
