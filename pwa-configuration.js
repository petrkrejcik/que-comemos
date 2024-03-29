const pwaConfiguration = {
	srcDir: './build',
	outDir: './.svelte-kit/output/client',
	includeManifestIcons: false,
	base: '/',
	scope: '/',
	manifest: {
		short_name: 'Que comemos?',
		id: '/',
		name: 'Que comemos?',
		scope: '/',
		start_url: '/',
		display: 'standalone',
		theme_color: '#2a2e37',
		background_color: '#18181b',
		icons: [
			{
				src: '/logo64.png',
				sizes: '64x64',
				type: 'image/png'
			},
			{
				src: '/logo256.png',
				sizes: '256x256',
				type: 'image/png'
			},
			{
				src: '/logo512.png',
				sizes: '512x512',
				type: 'image/png'
			}
		]
	},
	workbox: {
		navigateFallback: '/',
		// vite and SvelteKit are not aligned: pwa plugin will use /\.[a-f0-9]{8}\./ by default: #164 optimize workbox work
		dontCacheBustURLsMatching: /-[a-f0-9]{8}\./,
		globDirectory: './build',
		globPatterns: ['robots.txt', '**/*.{js,css,html,ico,png,svg,webmanifest}'],
		globIgnores: ['**/sw*', '**/workbox-*'],
		manifestTransforms: [
			async (entries) => {
				// manifest.webmanifest is added always by pwa plugin, so we remove it.
				// EXCLUDE from the sw precache sw and workbox-*
				const manifest = entries
					.filter(
						({ url }) =>
							url !== 'manifest.webmanifest' && url !== 'sw.js' && !url.startsWith('workbox-')
					)
					.map((e) => {
						let url = e.url;
						if (url && url.endsWith('.html')) {
							if (url.startsWith('/')) {
								url = url.slice(1);
							}
							if (url === 'index.html') {
								e.url = '/';
							} else if (url.endsWith('index.html')) {
								e.url = `/${url.substring(0, url.lastIndexOf('/'))}`;
							} else if (url.endsWith('.html')) {
								e.url = `/${url.substring(0, url.length - '.html'.length)}`;
							}
						}

						return e;
					});

				return { manifest };
			}
		]
	}
};

const reload = process.env.RELOAD_SW === 'true';
const replaceOptions = {
	__DATE__: new Date().toISOString(),
	__RELOAD_SW__: reload ? 'true' : 'false'
};

export { pwaConfiguration, replaceOptions };
