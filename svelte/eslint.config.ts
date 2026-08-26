import svelteConfig from '@aneuhold/eslint-config/src/configs/svelte-config';

export default [
  ...svelteConfig,
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
    rules: {}
  },
  {
    // `shared` is a generated copy of the root `shared` folder, linted at the root.
    ignores: ['shared', 'eslint.config.ts']
  }
];
