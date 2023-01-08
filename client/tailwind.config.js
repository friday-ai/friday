/* eslint @typescript-eslint/no-var-requires: "off" */
const defaultTheme = require('tailwindcss/defaultTheme');
const daisyui = require('daisyui');
const themes = require('daisyui/src/colors/themes');

module.exports = {
  mode: 'jit',
  content: {
    files: ['./src/index.html', './src/**/*.tsx', './src/**/*.ts'],
  },
  theme: {
    maxWidth: {
      none: 'none',
      0: '0rem',
      8: '2rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      ...defaultTheme.maxWidth,
    },
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
      'max-2xl': { max: '1535px' },
      'max-xl': { max: '1279px' },
      'max-lg': { max: '1023px' },
      'max-md': { max: '767px' },
      'max-sm': { max: '639px' },
    },
    extend: {
      colors: {
        lue: {
          50: '#ffffff',
          100: '#f3f5fc',
          200: '#a3b0e6',
          300: '#536cd0',
          400: '#283e94',
          500: '#131c44',
          600: '#10193c',
          700: '#0e1634',
          800: '#0d1430',
          '00': '#0b1128',
        },
        blueGray: {
          50: '#ffffff',
          100: '#f5f7f9',
          200: '#dfe5ec',
          300: 'cbd6e1',
          400: '#b4c4d4',
          500: '#9eb2c7',
          600: '#6d8bab',
          700: '#4a6582',
          800: '#2e3f51',
          900: '#131920',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        'minmax-280': 'repeat(auto-fit, minmax(278px, 280px))',
        'minmax-180': 'repeat(auto-fit, minmax(178px, 180px))',
      },
      animation: {
        enter: 'enter 200ms ease-out',
        leave: 'leave 150ms ease-in forwards',
        'slide-in': 'slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)',
      },
      keyframes: {
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.9)', opacity: 0 },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  variants: {},
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...themes['[data-theme=light]'],
          primary: '#121C42',
          secondary: '#004d73',
          accent: '#007fbd',
          neutral: '#9FB3C8',
          'base-100': '#ffffff',
          'base-200': '#f3f5fc',
          'base-300': '#d1d5db',
          info: '#007fdb',
          success: '#2F9316',
          warning: '#ED9E00',
          error: '#91240E',
        },
      },
      'black',
      'forest',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'luxury',
      'dracula',
      'cmyk',
    ],
  },
};
