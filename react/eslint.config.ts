import reactConfig from '@aneuhold/eslint-config/src/configs/react-next-config';

export default [
  ...reactConfig,
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
    files: ['**/*.ts', '**/*.tsx'],
    rules: {}
  },
  {
    ignores: ['**/next-env.d.ts', 'out', 'eslint.config.ts']
  }
];
