import svelteConfig from '@aneuhold/eslint-config/src/configs/svelte-config';

export default [
  ...svelteConfig,
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
    ignores: ['eslint.config.ts']
  }
];
