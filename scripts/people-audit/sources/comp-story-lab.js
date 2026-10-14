// Computational Story Lab (https://cdanfort.w3.uvm.edu/Team/)
//
// Hand-edited page (RapidWeaver). People are listed under three headings,
// one per block, written as "Name, description." with the name usually
// linked. Photos sit in a row of their own just above each row of names, in
// the same order. The server's Last-Modified header is the file's edit date.

import { parse } from 'node-html-parser';

const PAGE = 'https://cdanfort.w3.uvm.edu/Team/';

// Page heading -> how to read the people under it. Blocks under any other
// heading (the intro text, say) are skipped.
const SECTIONS = {
	'Current team members': { status: 'current' },
	'Staff members': { status: 'current', staff: true },
	'Former team members': { status: 'alumni' }
};

/** "Name, description." -> { name, role, url }, or null if it isn't a person. */
function readBlock(el) {
	const text = el.text.replace(/\s+/g, ' ').trim();
	const comma = text.indexOf(',');
	if (comma < 0) return null;
	const name = text.slice(0, comma).trim();
	const link = el.querySelector('a');
	return {
		name,
		role: text.slice(comma + 1).trim(),
		url: link?.text.trim() === name ? link.getAttribute('href') : ''
	};
}

export default {
	group: 'comp-story-lab',
	url: PAGE,

	async fetch() {
		const res = await fetch(PAGE);
		if (!res.ok) throw new Error(`${PAGE} responded ${res.status}`);
		const root = parse(await res.text());

		const people = [];
		let section = null;
		let photos = []; // the photo row above the current row of names
		let blocks = []; // the current row of names

		// Pair photos with names only when the counts match, so one missing
		// photo can't shift the rest onto the wrong people
		const flush = () => {
			blocks.forEach((el, i) => {
				const person = readBlock(el);
				if (!person) return;
				const src = photos.length === blocks.length ? photos[i] : '';
				people.push({ ...person, ...section, photo: src ? new URL(src, PAGE).href : '' });
			});
			photos = [];
			blocks = [];
		};

		// Headings, photos and person blocks, in page order
		for (const el of root.querySelectorAll('h3, img, .text_stack')) {
			if (el.tagName === 'H3') {
				flush();
				section = SECTIONS[el.text.trim()] || null;
			} else if (el.tagName === 'IMG') {
				if (blocks.length > 0) flush();
				photos.push(el.getAttribute('src'));
			} else if (section) {
				blocks.push(el);
			}
		}
		flush();

		const modified = res.headers.get('last-modified');
		return { lastChanged: modified ? new Date(modified) : null, people };
	}
};
