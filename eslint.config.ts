import tsLibConfig from '@aneuhold/eslint-config/src/configs/ts-lib-config';

export default [
  ...tsLibConfig,
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
    rules: {}
  },
  {
    // .claude has GSAP examples in it
    ignores: ['**/lib', '.claude', 'eslint.config.ts', 'svelte', 'react']
  }
];
