// Bagrow Lab (https://bagrow.com/people/)
//
// Hand-written Bootstrap page on a plain Apache server. Current members
// (Jim Bagrow first) come before an "Alumni" heading, one thumbnail per
// person with the name in <h4> and "Role. <a>Homepage</a>" below it. The
// server's Last-Modified header is the file's edit date. (The footer also
// prints a hand-set "Last updated" date, which tends to lag behind.)
// The photo is the <img> in the same thumbnail as the caption.

import { parse } from 'node-html-parser';

const PAGE = 'https://bagrow.com/people/';

export default {
	group: 'bagrow-lab',
	url: PAGE,

	async fetch() {
		const res = await fetch(PAGE);
		if (!res.ok) throw new Error(`${PAGE} responded ${res.status}`);
		const root = parse(await res.text());

		const people = [];
		let status = 'current'; // no heading above the current members
		// The "Alumni" heading and person captions, in page order
		for (const el of root.querySelectorAll('h3, .caption')) {
			if (el.tagName === 'H3') {
				status = /alumni/i.test(el.text) ? 'alumni' : null;
				continue;
			}
			if (!status) continue;

			const name = el.querySelector('h4')?.text.trim();
			if (!name) continue;
			const p = el.querySelector('p');
			const link = p?.querySelector('a');
			// Caption text minus the trailing "Homepage"/"LinkedIn" link
			const role = (link ? p.text.replace(link.text, '') : p?.text || '')
				.replace(/\s+/g, ' ')
				.trim()
				.replace(/\.$/, '');
			people.push({
				name,
				role,
				status,
				url: link ? new URL(link.getAttribute('href'), PAGE).href : '',
				photo: photoOf(el)
			});
		}

		const modified = res.headers.get('last-modified');
		return { lastChanged: modified ? new Date(modified) : null, people };
	}
};

function photoOf(caption) {
	const src = caption.parentNode.querySelector('img')?.getAttribute('src');
	return src ? new URL(src, PAGE).href : '';
}
