import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter: vercel(),
    target: '#svelte',
    vite: {
      define: {
        'process.env': process.env
      }
    }
  },

  preprocess: [preprocess({})]
};
