module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    'linebreak-style': 0,
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-props-no-spreading': [0],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    /**
     * Allow imports from `.ts` files to always be allowed to import without the
     * extension.
     */
    'import/extensions': ['error', {
      ts: 'never',
    }],
    // Import resolver turned off because this is handled by TypeScript
    'import/no-unresolved': [0],
  },
};
