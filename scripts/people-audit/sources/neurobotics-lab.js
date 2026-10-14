// Neurobotics Lab (https://www.uvm.edu/neurobotics/people)
//
// WordPress site. The REST API gives us the page body and its own edit date
// (`modified_gmt`), which is better evidence than any server header. The body
// is hand-edited: an <h4> heading per group of people, then a table with one
// row per person, written as "<a>Name</a><br>Role<br>Degrees…".
//
// The photo is in the row's first cell, usually a 150px thumbnail. The media
// API lists every size WordPress made of each upload, so we swap it for the
// largest uncropped version up to 800px (originals can be 2560px).

import { parse } from 'node-html-parser';

const PAGE = 'https://www.uvm.edu/neurobotics/people';
const API =
	'https://www.uvm.edu/neurobotics/wp-json/wp/v2/pages?slug=people&_fields=modified_gmt,content';
const MEDIA =
	'https://www.uvm.edu/neurobotics/wp-json/wp/v2/media?per_page=100&_fields=source_url,media_details';
const MAX_PHOTO_WIDTH = 800;

// Page heading -> how to read the people under it. Rows under any other
// heading ("Prospective Students", the photo-only headings) are skipped.
const SECTIONS = [
	[/^Principal Investigator/, { status: 'current' }],
	[/^Graduate Researchers/, { status: 'current' }],
	[/^Undergraduate Researchers/, { status: 'current' }],
	[/^Alumni/, { status: 'alumni' }]
];

export default {
	group: 'neurobotics-lab',
	url: PAGE,

	async fetch() {
		const res = await fetch(API);
		if (!res.ok) throw new Error(`${API} responded ${res.status}`);
		const [page] = await res.json();
		if (!page) throw new Error(`${API} returned no page`);
		// HTML comments (a hidden "Collaborators" block) are dropped by the parser
		const root = parse(page.content.rendered);

		const sizes = await mediaSizes();

		const people = [];
		let section = null;
		// Headings and person rows, in page order
		for (const el of root.querySelectorAll('h4, tr')) {
			if (el.tagName === 'H4') {
				const heading = el.text.trim();
				section = SECTIONS.find(([re]) => re.test(heading))?.[1] || null;
				continue;
			}
			if (!section) continue;

			// The text cell is the last one; the first holds the photo
			const cell = el.querySelectorAll('td').at(-1);
			if (!cell) continue;
			const lines = cell.innerHTML
				.split(/<br\s*\/?>/i)
				.map((line) => parse(line).text.replace(/\s+/g, ' ').trim())
				.filter(Boolean);
			const link = cell.querySelector('a');
			// The name is the first link ("Nick Cheney (cv)" has a second one)
			const name = (link?.text || lines[0] || '').trim().replace(/^Dr\.\s+/, '');
			if (!name) continue;

			people.push({
				name,
				role: lines[1] || '',
				...section,
				url: link?.getAttribute('href') || '',
				photo: bestPhoto(el.querySelector('td img'), sizes)
			});
		}

		const lastChanged = page.modified_gmt ? new Date(`${page.modified_gmt}Z`) : null;
		return { lastChanged, people };
	}
};

function bestPhoto(img, sizes) {
	const src = img?.getAttribute('src');
	if (!src) return '';
	const url = new URL(src, PAGE).href;
	const versions = sizes.get(url);
	if (!versions) return url;
	return versions.filter((v) => v.width <= MAX_PHOTO_WIDTH).at(-1)?.url || versions[0]?.url || url;
}

// Every image file URL -> all uncropped versions of that upload, smallest first
async function mediaSizes() {
	const sizes = new Map();
	for (let page = 1, pages = 1; page <= pages; page++) {
		const res = await fetch(`${MEDIA}&page=${page}`);
		if (!res.ok) return sizes; // photos then fall back to the thumbnails
		pages = Number(res.headers.get('x-wp-totalpages')) || 1;
		for (const { source_url, media_details: m } of await res.json()) {
			if (!m?.width) continue;
			const all = [
				{ url: source_url, width: m.width, height: m.height },
				...Object.values(m.sizes || {}).map((v) => ({ url: v.source_url, ...v }))
			];
			// Same shape as the upload, so not a cropped banner like 900x400
			const ratio = m.width / m.height;
			const versions = all
				.filter((v) => Math.abs(v.width / v.height - ratio) < 0.02)
				.sort((a, b) => a.width - b.width);
			for (const v of all) sizes.set(v.url, versions);
		}
	}
	return sizes;
}
