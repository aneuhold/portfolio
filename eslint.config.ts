import tsLibConfig from '@aneuhold/eslint-config/src/configs/ts-lib-config';

export default [
  ...tsLibConfig,
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
    rules: {}
  },
  {
    ignores: ['**/lib', 'eslint.config.ts', 'svelte', 'react']
  }
];
