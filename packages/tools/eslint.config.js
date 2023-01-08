module.exports = {
  extends: ['airbnb-typescript-prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  globals: {
    document: true,
    navigator: true,
    window: true,
    describe: true,
    it: true,
    should: true,
    beforeEach: true,
    afterEach: true,
    before: true,
    after: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [2, { args: 'all', argsIgnorePattern: '^_' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['test/**/*.{js,ts}'],
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        assert: 'either', // either check for `htmlFor` or `nesting`
      },
    ],
    'no-param-reassign': ['error', { props: false }],
    'import/no-unresolved': ['error', { ignore: ['^virtual:'] }],
  },
};
