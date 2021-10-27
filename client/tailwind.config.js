const defaultTheme = require('tailwindcss/defaultTheme')
// const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'media',
  mode: 'jit',
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
      colors: {
        "blue": {
          "50": "#ffffff",
          "100": "#f3f5fc",
          "200": "#a3b0e6",
          "300": "#536cd0",
          "400": "#283e94",
          "500": "#131c44",
          "600": "#10193c",
          "700": "#0e1634",
          "800": "#0d1430",
          "900": "#0b1128"
        },
        "blueGray": {
          "50": "#ffffff",
          "100": "#f5f7f9",
          "200": "#dfe5ec",
          "300": "#cbd6e1",
          "400": "#b4c4d4",
          "500": "#9eb2c7",
          "600": "#6d8bab",
          "700": "#4a6582",
          "800": "#2e3f51",
          "900": "#131920"
        },
        /*
        coolGray: colors.coolGray,
        trueGray: colors.trueGray,
        warmGray: colors.warmGray,
        orange: colors.orange,
        amber: colors.amber,
        lime: colors.lime,
        teal: colors.teal,
        cyan: colors.cyan,
        lightBlue: colors.lightBlue,
        emerald: colors.emerald,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        rose: colors.rose,
         */
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: []
}
