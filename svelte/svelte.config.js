import preprocess from 'svelte-preprocess';
import path from 'path';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({}),

  kit: {
    vite: {
      resolve: {
        alias: {
          src: path.resolve('./src'),
          config: path.resolve('./_shared-config')
        }
      },
      server: {
        fs: {
          allow: ['./_shared-config']
        }
      }
    },
    adapter: adapter({
      // default options are shown
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false
    }),

    prerender: {
      // This can be false if you're using a fallback (i.e. SPA mode)
      default: true
    }
  }
};

export default config;
