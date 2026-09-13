import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// eslint-disable-next-line jsdoc/check-tag-names
/** @type {import('@sveltejs/kit').Config} */
const config = {
  // TypeScript that emits code, such as an enum, needs the script preprocessor. See
  // https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/preprocess.md
  preprocess: vitePreprocess({
    script: true
  }),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    alias: {
      $components: 'src/components'
    }
  }
};

export default config;
