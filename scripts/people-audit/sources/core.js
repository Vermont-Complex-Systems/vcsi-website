// CORE Systems Lab (https://madsalma.github.io/people.html)
//
// Hand-written HTML on GitHub Pages, no data file. Each person is a bold
// <a> with the name (often followed by ", Ph.D." or ", MSEE") under a
// <div id="section"> heading such as "Ph.D. Students" or "Alumni". Below the
// cards, "Other former team members" lists more alumni as "Name (years) ...".
// The last commit to people.html in the site's repo dates the page; it also
// moves when the shared header or nav changes, so treat it as an upper bound.
// Each card's photo sits in the <div> just before the one with the name;
// people in the "Other former team members" lists have none.

import { parse } from 'node-html-parser';

const PAGE = 'https://madsalma.github.io/people.html';
const COMMITS =
	'https://api.github.com/repos/madsalma/madsalma.github.io/commits?path=people.html&per_page=1';

// Section heading -> role and status. Headings are matched case-insensitively.
const SECTIONS = {
	director: { role: 'Director', status: 'current' },
	'post-phd research associates': { role: 'Postdoctoral Research Associate', status: 'current' },
	'ph.d. students': { role: 'Ph.D. Student', status: 'current' },
	'm.s. students': { role: 'M.S. Student', status: 'current' },
	'undergraduate students': { role: 'Undergraduate Student', status: 'current' },
	alumni: { role: '', status: 'alumni' }
};

const clean = (s) => s.replace(/\s+/g, ' ').trim();

export default {
	group: 'core',
	url: PAGE,

	async fetch() {
		const res = await fetch(PAGE);
		if (!res.ok) throw new Error(`${PAGE} responded ${res.status}`);
		const root = parse(await res.text());

		const people = [];
		const seen = new Set(); // some alumni appear both as a card and in the list
		const add = (person) => {
			const key = person.name.toLowerCase().replace(/[^a-z]/g, '');
			if (seen.has(key)) return;
			seen.add(key);
			people.push(person);
		};

		let section = null;
		let former = false; // inside "Other former team members"
		// Headings, name links and list items, in page order
		for (const el of root.querySelectorAll('[id=section], h1, h2, a, li')) {
			const text = clean(el.text);

			if (el.id === 'section') {
				section = SECTIONS[text.toLowerCase()] || null;
			} else if (el.tagName === 'H1') {
				if (/former team members/i.test(text)) former = true;
			} else if (el.tagName === 'H2' && former) {
				section = { role: text, status: 'alumni' };
			} else if (el.tagName === 'LI' && former && section) {
				// "Emily Ninestein (URX, HT, 2023-2025) - Now at ISO New England"
				add({ name: clean(text.split('(')[0]), role: section.role, status: 'alumni' });
			} else if (
				el.tagName === 'A' &&
				!former &&
				section &&
				/font-weight:\s*bold/.test(el.getAttribute('style') || '')
			) {
				const name = text
					.replace(/^.*Professor\s+/, '') // "L. Richard Fisher Associate Professor Mads …"
					.replace(/,.*$/, '') // ", Ph.D.", ", MSEE"
					.replace(/\s*\(.*?\)/, '') // nickname: "Prithvi (Vee) Kalkunthe"
					.trim();
				// The card is one <br/>-separated line per fact; for alumni the line
				// after the name says where they went ("After CORE Systems Lab: …")
				const card = el.parentNode;
				const lines = card.innerHTML
					.split(/<br\s*\/?>/i)
					.map((l) => clean(parse(l).text))
					.filter(Boolean);
				const next = lines[lines.findIndex((l) => l.includes(text)) + 1] || '';
				const role = section.role || next.replace(/^After CORE Systems Lab[^:]*:\s*/, 'Now: ');
				const email = card.text.match(/[\w.+-]+@[\w-]+(\.[\w-]+)+/)?.[0] || '';
				const src = card.previousElementSibling?.querySelector('img.photo')?.getAttribute('src');
				const photo = src ? new URL(src, PAGE).href : '';
				add({ name, role, status: section.status, email, photo });
			}
		}

		return { lastChanged: await lastCommitDate(), people };
	}
};

async function lastCommitDate() {
	// Unauthenticated GitHub API allows 60 requests an hour, plenty for this.
	// In CI, GITHUB_TOKEN lifts the limit.
	const headers = process.env.GITHUB_TOKEN
		? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
		: {};
	const res = await fetch(COMMITS, { headers });
	if (!res.ok) return null;
	const [latest] = await res.json();
	return latest ? new Date(latest.commit.committer.date) : null;
}
