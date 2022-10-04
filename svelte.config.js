import preprocess from 'svelte-preprocess';
// import { VitePWA } from 'vite-plugin-pwa';
import adapter from '@sveltejs/adapter-static';
// import replace from '@rollup/plugin-replace';
// import { pwaConfiguration, replaceOptions } from './pwa-configuration.js';
import path from "path";

export default {
  kit: {
    adapter: adapter({
      // default options are shown
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
    }),
    vite: {
      define: {
        'process.env': process.env
      },
      // plugins: [VitePWA(pwaConfiguration), replace(replaceOptions)],
      resolve: {
        alias: {
          $pages: path.resolve("./src/pages"),
          $components: path.resolve("./src/components"),
          $actions: path.resolve("./src/actions"),
        }
      }
    },
    prerender: {
      // This can be false if you're using a fallback (i.e. SPA mode)
      default: true
    }
  },

  preprocess: [preprocess({})]
};
