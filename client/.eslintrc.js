module.exports = {
  extends: ["airbnb-typescript-prettier"],
  parserOptions: {
    project: "./tsconfig.json",
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "no-param-reassign": ["error", {"props": false}],
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true
      }
    ],
    semi: 0, // this cause a conflict with typescript rules
    '@typescript-eslint/semi': ['error', 'always'],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'max-len': [
      'error',
      150,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
  }
}
