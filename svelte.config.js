import adapter from '@sveltejs/adapter-static';
import { readFileSync } from 'fs';

// Load CSV data for prerendering
const membersCSV = readFileSync('src/data/members.csv', 'utf-8');
const groupsCSV = readFileSync('src/data/groups.csv', 'utf-8');

// Parse CSV to get IDs
const memberIds = membersCSV.split('\n').slice(1).filter(line => line.trim()).map(line => line.split(',')[0]);
const groupIds = groupsCSV.split('\n').slice(1).filter(line => line.trim()).map(line => line.split(',')[0]);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		prerender: {
			entries: [
				'*',
				...memberIds.map(id => `/who-we-are/${id}`),
				...groupIds.map(id => `/research/group/${id}`),
				'/research/mass-mutual'
			]
		},
		experimental: {
			remoteFunctions: true
		},
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		}
	},
	compilerOptions: {
		experimental: {
			async: true
		}
	},
	vitePlugin: {
		inspector: true
	}
};

export default config;