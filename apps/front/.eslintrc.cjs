const config = require("@friday-ai/tools/eslint/react-internal");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
};
