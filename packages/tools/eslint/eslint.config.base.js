module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-typescript-prettier'],
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc', 'import'],
  globals: {
    document: false,
    navigator: false,
    window: false,
    describe: true,
    it: true,
    should: true,
    beforeEach: true,
    afterEach: true,
    before: true,
    after: true,
  },
};
