import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';

// eslint-disable-next-line jsdoc/check-tag-names
/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex({
      extensions: ['.md']
    })
  ],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    alias: {
      src: 'src',
      config: '_shared-config'
    }
  },
  extensions: ['.svelte', '.md']
};

export default config;
