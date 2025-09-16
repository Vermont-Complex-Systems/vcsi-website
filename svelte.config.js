import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		prerender: {
			handleHttpError: 'ignore',
			handleUnseenRoutes: 'ignore'
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
		})
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