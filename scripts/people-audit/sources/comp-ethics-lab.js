// Computational Ethics Lab (https://compethicslab.org/team/)
//
// Prerendered SvelteKit site. Current members are cards in a grid, former
// members are a list under the "Alumni" heading. We read the rendered HTML
// using the component class names, not the hashed svelte-* ones, which change
// on every build. The server's Last-Modified header is the deploy date of the
// whole site (every file shares it), so it's a weak signal.
//
// Photos live at /common/assets/members/<id>.jpg. The page falls back to
// <id>.png and then a generic avatar.jpg when that's missing, so we check the
// file exists and leave the photo empty rather than report the avatar.

import { parse } from 'node-html-parser';

const PAGE = 'https://compethicslab.org/team/';

export default {
	group: 'comp-ethics-lab',
	url: PAGE,

	async fetch() {
		const res = await fetch(PAGE);
		if (!res.ok) throw new Error(`${PAGE} responded ${res.status}`);
		const root = parse(await res.text());

		const text = (el) => el?.text.replace(/\s+/g, ' ').trim() || '';

		const cards = root.querySelectorAll('.members-section .member-card');
		const current = await Promise.all(
			cards.map(async (card) => {
				// Links are either internal profile pages (/about/…) or external sites
				const href = card.querySelector('a.member-link')?.getAttribute('href');
				const src = card.querySelector('.member-photo img')?.getAttribute('src');
				return {
					name: text(card.querySelector('.member-name')),
					role: text(card.querySelector('.member-position')),
					status: 'current',
					url: href ? new URL(href, PAGE).href : '',
					photo: src ? await findPhoto(new URL(src, PAGE).href) : ''
				};
			})
		);

		// Alumni are listed without photos
		const alumni = root.querySelectorAll('.alumni-section li').map((li) => ({
			name: text(li.querySelector('.alumni-name')),
			role: text(li.querySelector('.alumni-role')),
			status: 'alumni'
		}));

		const people = [...current, ...alumni].filter((p) => p.name);
		const modified = res.headers.get('last-modified');
		return { lastChanged: modified ? new Date(modified) : null, people };
	}
};

// The photo as the page would end up showing it: the .jpg, else the .png,
// else '' (the shared avatar)
async function findPhoto(jpg) {
	for (const url of [jpg, jpg.replace(/\.jpe?g$/i, '.png')]) {
		if (/\/avatar\.\w+$/.test(url)) return '';
		const res = await fetch(url, { method: 'HEAD' });
		if (res.ok && res.headers.get('content-type')?.startsWith('image/')) return url;
	}
	return '';
}
