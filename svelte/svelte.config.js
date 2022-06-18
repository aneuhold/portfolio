
import preprocess from 'svelte-preprocess';
import path from 'path';

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
    }
	}
};

export default config;
