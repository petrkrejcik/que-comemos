import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({ edge: true }),
		alias: {
			$pages: path.resolve('./src/pages'),
			$components: path.resolve('./src/components'),
			$actions: path.resolve('./src/actions'),
			$server: path.resolve('./server')
		}
	}
};
