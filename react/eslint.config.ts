import reactConfig from '@aneuhold/eslint-config/src/configs/react-next-config';

export default [
  ...reactConfig,
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
    files: ['**/*.ts', '**/*.tsx'],
    rules: {}
  },
  {
    // `shared` is a generated copy of the root `shared` folder, linted at the root.
    ignores: ['shared', '**/next-env.d.ts', 'out', 'eslint.config.ts']
  }
];
