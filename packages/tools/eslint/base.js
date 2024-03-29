const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "prettier",
    "eslint-config-turbo",
    "airbnb-base-typescript-prettier",
  ],
  plugins: [
    "only-warn",
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-tsdoc",
    "import",
  ],
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
  env: {
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    ".*.js",
    "**.d.ts",
    "node_modules/",
    "dist/",
    "lib/",
    "tsup.config.ts",
  ],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
    },
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      2,
      { args: "all", argsIgnorePattern: "^_" },
    ],
    "import/no-cycle": 0,
    "class-methods-use-this": 0,
    semi: 0, // this cause a conflict with typescript rules
    "@typescript-eslint/semi": ["error", "always"],
    quotes: [
      "error",
      "single",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    camelcase: [
      "error",
      {
        properties: "never",
      },
    ],
    "tsdoc/syntax": 0, // this is ignored for the moment due to lack of flexibility. See issue: https://github.com/microsoft/tsdoc/issues/220
    "arrow-spacing": [
      "error",
      {
        before: true,
        after: true,
      },
    ],
    "no-mixed-spaces-and-tabs": "error",
    "no-eval": "error",
    "block-spacing": ["error", "always"],
    "comma-spacing": [
      "error",
      {
        before: false,
        after: true,
      },
    ],
    curly: ["error", "all"],
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "none",
        ignoreRestSiblings: true,
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "test.{js,jsx,ts,tsx}",
          "test-*.{js,jsx,ts,tsx}",
          "**/test/**/*.{js,jsx,ts,tsx}",
        ],
      },
    ],
    "import/no-import-module-exports": [
      "error",
      { exceptions: ["**/migrations/*.{js,ts}"] },
    ],
    "max-len": [
      "error",
      135,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "brace-style": [
      "error",
      "1tbs",
      {
        allowSingleLine: false,
      },
    ],
    "func-call-spacing": ["error", "never"],
    "no-param-reassign": [
      "error",
      {
        props: false,
      },
    ],
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterOverload: true,
        exceptAfterSingleLine: true,
      },
    ],
    "import/no-unresolved": "error",
  },
};
