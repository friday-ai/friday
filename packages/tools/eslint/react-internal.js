const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["eslint:recommended", "prettier", "eslint-config-turbo"],
  plugins: ["only-warn", "jsx-a11y", "@typescript-eslint/eslint-plugin"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [".*.js", "*.d.ts", "node_modules/", "dist/", "lib/"],
  overrides: [
    // Force ESLint to detect .tsx files
    { files: ["*.js?(x)", "*.ts?(x)"] },
  ],
  rules: {
    "no-undef": "off",
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        assert: "either", // either check for `htmlFor` or `nesting`
      },
    ],
    "no-param-reassign": ["error", { props: false }],
    "@typescript-eslint/no-unused-vars": [
      2,
      { args: "all", argsIgnorePattern: "^_" },
    ],
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "none",
        ignoreRestSiblings: true,
      },
    ],
  },
};
