module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'linebreak-style': 0,
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    /**
     * Allow imports from `.ts` files to always be allowed to import without the
     * extension.
     */
    'import/extensions': [
      'error',
      {
        ts: 'never',
      },
    ],
  },
};
