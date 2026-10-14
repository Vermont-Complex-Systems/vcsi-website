// Joint Lab (https://joint-lab.github.io/people/)
//
// The site is built with Gatsby, which publishes the data behind each page as
// JSON, so we read that instead of parsing HTML. Each person is a file in
// src/data/people/ of the lab's GitHub repo; the last commit to that folder
// tells us when the people list last changed.

const PAGE = 'https://joint-lab.github.io/people/';
const DATA = 'https://joint-lab.github.io/page-data/people/page-data.json';
const COMMITS =
	'https://api.github.com/repos/joint-lab/joint-lab.github.io/commits?path=src/data/people&per_page=1';

export default {
	group: 'joint-lab',
	url: PAGE,

	async fetch() {
		const res = await fetch(DATA);
		if (!res.ok) throw new Error(`${DATA} responded ${res.status}`);
		const { data } = (await res.json()).result;

		const toPerson = (status) => (edge) => {
			const p = edge.node.frontmatter;
			return {
				name: `${p.firstName} ${p.lastName}`,
				role: p.role,
				status,
				url: p.personalURL || p.scholarURL || p.githubURL || '',
				email: p.email || '',
				photo: photoOf(p)
			};
		};

		const people = [
			...data.allCurrentMembers.edges.map(toPerson('current')),
			...data.alumni.edges.map(toPerson('alumni'))
		];

		return { lastChanged: await lastCommitDate(), people };
	}
};

// Gatsby's largest rendition of the headshot (alumni have none)
function photoOf(p) {
	const src = p.imageURL?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
	return src ? new URL(src, PAGE).href : '';
}

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
