module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
  plugins: ['simple-import-sort', 'import'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'newline-before-return': 'error',
    'simple-import-sort/sort': [
      'error',
      {
        groups: [
          ['^\\u0000', '^@?\\w'],
          ['^(@.*|$)', '^\\.'],
        ],
      },
    ],
    'sort-imports': 0, // disables eslint's default sort imports rule
  },
};
