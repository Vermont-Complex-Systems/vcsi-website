export const prerender = true;

import { readFileSync } from 'fs';

const SITE_URL = 'https://vermontcomplexsystems.org';

// Static routes — update when adding new pages
const staticRoutes = [
	'/',
	'/community/credits',
	'/community/paper-shredder',
	'/community/scraps',
	'/community/students',
	'/community/talkboctopus',
	'/education/BilDS',
	'/education/certificate',
	'/education/masters',
	'/education/phd',
	'/education/undergraduate',
	'/events',
	'/events/cnww',
	'/explore',
	'/funding',
	'/manifesto',
	'/projects',
	'/projects/ai-use',
	'/projects/barracuda',
	'/projects/hedonometer',
	'/projects/lemurs',
	'/projects/socks',
	'/projects/storywrangler',
	'/projects/wikiwrangler',
	'/projects/xenobots',
	'/research/group',
	'/research/mass-mutual',
	'/research/tgir',
	'/research/verso',
	'/who-we-are'
];

function parseCSVIds(path) {
	return readFileSync(path, 'utf-8')
		.split('\n')
		.slice(1)
		.filter(line => line.trim())
		.map(line => line.split(',')[0]);
}

export function GET() {
	const memberIds = parseCSVIds('src/data/members.csv');
	const groupIds = parseCSVIds('src/data/groups.csv');

	const dynamicRoutes = [
		...memberIds.map(id => `/who-we-are/${id}`),
		...groupIds.map(id => `/research/group/${id}`)
	];

	const allRoutes = [...staticRoutes, ...dynamicRoutes];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${SITE_URL}${route}</loc>
  </url>`).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
