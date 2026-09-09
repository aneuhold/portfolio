import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [enhancedImages(), sveltekit()],
  resolve: {
    alias: {
      src: path.resolve('./src')
    },
    // Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
    conditions: process.env.VITEST ? ['browser'] : undefined
  },
  test: {
    exclude: ['node_modules/**/*'],
    globals: true,
    environment: 'jsdom',
    server: {
      deps: {
        // Inline @testing-library/svelte so its .svelte.js files (which use Svelte 5 runes like
        // $state and $props) are compiled by the Svelte compiler during tests. Without this,
        // Vitest would use the SSR exports where runes throw "rune_outside_svelte" errors.
        inline: ['@testing-library/svelte']
      }
    }
  }
});
