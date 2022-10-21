import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import path from "path";

export default {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $pages: path.resolve("./src/pages"),
      $components: path.resolve("./src/components"),
      $actions: path.resolve("./src/actions"),
      $server: path.resolve("./server"),
    }
  },
};
