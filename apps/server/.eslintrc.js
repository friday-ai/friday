module.exports = {
  extends: ['../../packages/tools/eslint/eslint.config.server.js'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
