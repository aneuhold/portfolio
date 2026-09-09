import reactConfig from '@aneuhold/eslint-config/src/configs/react-next-config';

export default [
  ...reactConfig,
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
    files: ['**/*.ts', '**/*.tsx'],
    rules: {}
  },
  {
    ignores: ['**/next-env.d.ts', 'out', 'eslint.config.ts']
  }
];
