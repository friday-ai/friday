module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint/eslint-plugin',
    "eslint-plugin-tsdoc"
  ],
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    ecmaVersion: 2018
  },
  env: {
    node: true
  },
  globals: {
    'document': false,
    'navigator': false,
    'window': false,
    'describe': true,
    'it': true,
    'should': true,
    'beforeEach': true,
    'afterEach': true,
    'before': true,
    'after': true
  },
  rules: {
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'import/no-cycle': 0,
    'semi': 0, // this cause a conflict with typescript rules
    "@typescript-eslint/semi": ["error", "always"],
    'quotes': [
      'error',
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
    'camelcase': [
      'error',
      {
        'properties': 'never'
      }
    ],
    'tsdoc/syntax': 0, //this is ignored for the moment due to lack of flexibility. See issue: https://github.com/microsoft/tsdoc/issues/220
    'arrow-spacing': [
      'error',
      {
        'before': true,
        'after': true
      }
    ],
    'no-mixed-spaces-and-tabs': 'error',
    'no-eval': 'error',
    'block-spacing': ['error', 'always'],
    'comma-spacing': [
      'error',
      {
        'before': false,
        'after': true
      }
    ],
    'curly': ['error', 'all'],
    'no-unused-expressions': [
      'error',
      {
        'allowShortCircuit': true,
        'allowTernary': true,
        'allowTaggedTemplates': true
      }
    ],
    'no-unused-vars': [
      'error',
      {
        'vars': 'all',
        'args': 'none',
        'ignoreRestSiblings': true
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': ['test/**/*.ts',]
      }
    ],
    'max-len': [
      'error',
      130,
      2,
      {
        'ignoreUrls': true,
        'ignoreComments': false,
        'ignoreRegExpLiterals': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true
      }
    ],
    'brace-style': [
      'error',
      '1tbs',
      {
        'allowSingleLine': false
      }
    ],
    'func-call-spacing': ['error', 'never'],
    'no-param-reassign': [
      'error',
      {
        'props': false
      }
    ],
  },
}
