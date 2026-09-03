import svelteConfig from '@aneuhold/eslint-config/src/configs/svelte-config';

export default [
  ...svelteConfig,
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
    rules: {}
  },
  {
    ignores: ['eslint.config.ts']
  }
];
