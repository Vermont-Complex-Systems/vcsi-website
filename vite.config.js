import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from "path";
import dsv from "@rollup/plugin-dsv"; // import foo from 'foo.csv'

export default defineConfig({
	plugins: [sveltekit(), dsv()],
	resolve: {
		alias: {
			$data: path.resolve("./src/data"),
			$styles: path.resolve("./src/styles"),
		}
	},
});
