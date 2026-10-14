// Grid Verification Lab (https://samchevalier.github.io/lab.html)
//
// Sam Chevalier's Jekyll site. The lab page renders two data files from the
// GitHub repo, _data/people.yml (current members) and _data/alumni.yml, so we
// read those instead of parsing HTML. The last commit to either file tells us
// when the people list last changed.

const PAGE = 'https://samchevalier.github.io/lab.html';
const REPO = 'samchevalier/samchevalier.github.io';
const RAW = `https://raw.githubusercontent.com/${REPO}/HEAD`;
const FILES = { current: '_data/people.yml', alumni: '_data/alumni.yml' };

export default {
	group: 'grid-verification-lab',
	url: PAGE,

	async fetch() {
		const people = [];
		for (const [status, path] of Object.entries(FILES)) {
			const res = await fetch(`${RAW}/${path}`);
			if (!res.ok) throw new Error(`${RAW}/${path} responded ${res.status}`);
			for (const p of yamlList(await res.text())) {
				if (!p.name) continue;
				// `contact` is an email for most, a GitHub link for some
				const contact = p.contact || '';
				const isEmail = contact.includes('@') && !contact.startsWith('http');
				people.push({
					name: p.name,
					// "PhD Student since 2024 (Co-Advised with ...)" -> "PhD Student"
					role: (p.role || '').replace(/\s+since\b.*$/i, ''),
					status,
					url: p.website || (isEmail ? '' : contact),
					email: isEmail ? contact : '',
					// `img` is relative to the lab page ("photos/ben.jpeg")
					photo: p.img ? new URL(p.img, PAGE).href : ''
				});
			}
		}

		const dates = await Promise.all(Object.values(FILES).map(lastCommitDate));
		const known = dates.filter(Boolean);
		return { lastChanged: known.length ? new Date(Math.max(...known)) : null, people };
	}
};

/** A YAML list of flat maps ("- name: …" then "  key: …"), all these files use. */
function yamlList(text) {
	const items = [];
	for (const line of text.split(/\r?\n/)) {
		const m = line.match(/^(-\s+|\s+)(\w+):\s*(.*)$/);
		if (!m) continue;
		if (m[1].startsWith('-')) items.push({});
		if (items.length) items.at(-1)[m[2]] = m[3].trim().replace(/^(['"])(.*)\1$/, '$2');
	}
	return items;
}

async function lastCommitDate(path) {
	// Unauthenticated GitHub API allows 60 requests an hour, plenty for this.
	// In CI, GITHUB_TOKEN lifts the limit.
	const headers = process.env.GITHUB_TOKEN
		? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
		: {};
	const url = `https://api.github.com/repos/${REPO}/commits?path=${path}&per_page=1`;
	const res = await fetch(url, { headers });
	if (!res.ok) return null;
	const [latest] = await res.json();
	return latest ? new Date(latest.commit.committer.date) : null;
}
