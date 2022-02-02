import preprocess from 'svelte-preprocess';
import { VitePWA } from 'vite-plugin-pwa';
import adapter from '@sveltejs/adapter-static';
// import vercel from '@sveltejs/adapter-vercel';
import replace from '@rollup/plugin-replace';
import { pwaConfiguration, replaceOptions } from './pwa-configuration.js';

export default {
  kit: {
    adapter: adapter({
      // default options are shown
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false
    }),
    prerender: {
      crawl: false // Otherwise there is infinite prerender loop on `incrementWeek`
    },
    // adapter: vercel(),
    target: '#svelte',
    vite: {
      define: {
        'process.env': process.env
      },
      plugins: [VitePWA(pwaConfiguration), replace(replaceOptions)]
    }
  },

  preprocess: [preprocess({})]
};
