// Computational Finance Lab (https://compfi.org/team.php)
//
// Hand-written PHP page, one <figure> per person under "Founding Members",
// "Active Members" and "Alumni" headings. Every founding member is listed
// again as active or alumni, so we only read the founding block for roles:
// people repeated under "Active Members" often have an empty caption there.
// The server (Hostinger behind Cloudflare) sends no Last-Modified and there's
// no public repo, so we can't tell when the list last changed.
//
// Photos are thumbnails named "danforth-sm.jpg"; most have a full-size
// "danforth.jpg" next to them, which we use when it exists.

import { parse } from 'node-html-parser';

const PAGE = 'https://compfi.org/team.php';

// Page heading -> status. Blocks under any other heading are skipped.
const SECTIONS = {
	'Founding Members': null,
	'Active Members': 'current',
	Alumni: 'alumni'
};

export default {
	group: 'compfi',
	url: PAGE,

	async fetch() {
		const res = await fetch(PAGE);
		if (!res.ok) throw new Error(`${PAGE} responded ${res.status}`);
		const root = parse(await res.text());

		const people = [];
		const roles = {}; // name -> first non-empty caption anywhere on the page
		let status = null;
		// Section headings and person cards, in page order
		for (const el of root.querySelectorAll('h2, figure')) {
			if (el.tagName === 'H2') {
				status = SECTIONS[el.text.trim()] ?? null;
				continue;
			}
			const name = el.querySelector('h3')?.text.replace(/\s+/g, ' ').trim();
			if (!name) continue;
			const role = el.querySelector('figcaption p')?.text.replace(/\s+/g, ' ').trim() || '';
			roles[name] ||= role;
			if (!status) continue;

			const link = el.querySelector('a')?.getAttribute('href');
			const src = el.querySelector('img')?.getAttribute('src');
			people.push({
				name,
				role,
				status,
				url: link ? new URL(link, PAGE).href : '',
				photo: src ? new URL(src, PAGE).href : ''
			});
		}

		for (const p of people) p.role ||= roles[p.name];
		await Promise.all(people.map(async (p) => (p.photo = await fullSize(p.photo))));
		return { lastChanged: null, people };
	}
};

// "img/profile/danforth-sm.jpg" -> "img/profile/danforth.jpg" if the server has it
async function fullSize(photo) {
	const big = photo.replace(/-sm(\.\w+)$/, '$1');
	if (big === photo) return photo;
	const res = await fetch(big, { method: 'HEAD' }).catch(() => null);
	return res?.ok && res.headers.get('content-type')?.startsWith('image/') ? big : photo;
}
