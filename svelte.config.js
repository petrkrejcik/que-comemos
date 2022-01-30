import preprocess from 'svelte-preprocess';
import { VitePWA } from 'vite-plugin-pwa';
import vercel from '@sveltejs/adapter-vercel';
import replace from '@rollup/plugin-replace';
import { pwaConfiguration, replaceOptions } from './pwa-configuration.js';

export default {
  kit: {
    adapter: vercel(),
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
