import tsLibConfig from '@aneuhold/eslint-config/src/configs/ts-lib-config';

export default [
  ...tsLibConfig,
  {
    // Anchors the TypeScript project lookup to this directory. The parser otherwise infers
    // it from the call stack, which is ambiguous as soon as an editor loads this config and
    // the other workspace configs into one ESLint process.
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
    rules: {}
  },
  {
    // .claude has GSAP examples in it
    ignores: ['**/lib', '**/.tsbuild', '.claude', 'eslint.config.ts', 'svelte', 'react']
  }
];
