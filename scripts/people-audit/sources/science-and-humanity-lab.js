// Science and Humanity Lab (https://scienceandhumanitylab.github.io/people/)
//
// Jekyll site (academicpages). Each person is a Markdown file in _people/ of
// the lab's GitHub repo, with name, role and email in its front matter, so we
// read those instead of parsing HTML. The people page (_pages/people.html)
// only lists the roles in ROLES; it has no alumni section. The last commit to
// _people/ tells us when the people list last changed.

const PAGE = 'https://scienceandhumanitylab.github.io/people/';
const REPO = 'scienceandhumanitylab/scienceandhumanitylab.github.io';
const LIST = `https://api.github.com/repos/${REPO}/contents/_people`;
const COMMITS = `https://api.github.com/repos/${REPO}/commits?path=_people&per_page=1`;

// Front matter `role` -> label, as on the people page. People with any other
// role don't appear on the page, so we skip them too.
const ROLES = {
	pi: 'Principal Investigator',
	phd: 'PhD Student',
	ms: 'MS Student',
	cert: 'Graduate Certificate Student'
};

export default {
	group: 'science-and-humanity-lab',
	url: PAGE,

	async fetch() {
		const res = await fetch(LIST, { headers: githubHeaders() });
		if (!res.ok) throw new Error(`${LIST} responded ${res.status}`);
		const files = (await res.json()).filter((f) => f.name.endsWith('.md'));

		// Raw file downloads don't count against the API rate limit
		const people = [];
		for (const file of files) {
			const raw = await fetch(file.download_url);
			if (!raw.ok) continue;
			const p = frontMatter(await raw.text());
			if (!p.name || !ROLES[p.role]) continue;
			people.push({
				name: p.name,
				role: p.position || ROLES[p.role],
				status: 'current',
				url: p.website || '',
				email: p.email || '',
				// `image` is a site path ("/images/bio-avi.png"), served as-is
				photo: p.image ? new URL(p.image, PAGE).href : ''
			});
		}

		return { lastChanged: await lastCommitDate(), people };
	}
};

/** Flat `key: value` pairs between the leading `---` lines (all these files need). */
function frontMatter(text) {
	const block = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!block) return {};
	const fields = {};
	for (const line of block[1].split(/\r?\n/)) {
		const m = line.match(/^(\w+):\s*(.*)$/);
		if (m) fields[m[1]] = m[2].trim().replace(/^(['"])(.*)\1$/, '$2');
	}
	return fields;
}

// Unauthenticated GitHub API allows 60 requests an hour, plenty for this.
// In CI, GITHUB_TOKEN lifts the limit.
function githubHeaders() {
	return process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
}

async function lastCommitDate() {
	const res = await fetch(COMMITS, { headers: githubHeaders() });
	if (!res.ok) return null;
	const [latest] = await res.json();
	return latest ? new Date(latest.commit.committer.date) : null;
}
