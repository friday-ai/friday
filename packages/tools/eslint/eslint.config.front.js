module.exports = {
  extends: ['./eslint.config.base.js'],
  rules: {
    '@typescript-eslint/no-unused-vars': [2, { args: 'all', argsIgnorePattern: '^_' }],
    'import/no-cycle': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.{js,ts}', '**/*.config.{js,ts}'],
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
