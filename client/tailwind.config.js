const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'media',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    safeList: [],
    content: [
      './src/index.html',
      './src/**/*.tsx',
      './src/**/*.ts',
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: []
}
