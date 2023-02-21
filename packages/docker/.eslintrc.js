module.exports = {
  extends: ['../tools/eslint/eslint.config.server.js'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
