const defaultTheme = require('tailwindcss/defaultTheme')
// const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: {
    files: [
      './src/index.html',
      './src/**/*.tsx',
      './src/**/*.ts',
    ],
  },
  theme: {
    maxWidth: {
      '0': '0rem',
      'none': 'none',
      '8': '2rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '28': '7rem',
      '32': '8rem',
      '36': '9rem',
      '40': '10rem',
      ...defaultTheme.maxWidth,
    },
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
      'max-2xl': {'max': '1535px'},
      'max-xl': {'max': '1279px'},
      'max-lg': {'max': '1023px'},
      'max-md': {'max': '767px'},
      'max-sm': {'max': '639px'},
    },
    extend: {
      colors: {
        'lue': {
          '50': '#ffffff',
          '100': '#f3f5fc',
          '200': '#a3b0e6',
          '300': '#536cd0',
          '400': '#283e94',
          '500': '#131c44',
          '600': '#10193c',
          '700': '#0e1634',
          '800': '#0d1430',
          '00': '#0b1128'
        },
        'blueGray': {
          '50': '#ffffff',
          '100': '#f5f7f9',
          '200': '#dfe5ec',
          '300': 'cbd6e1',
          '400': '#b4c4d4',
          '500': '#9eb2c7',
          '600': '#6d8bab',
          '700': '#4a6582',
          '800': '#2e3f51',
          '900': '#131920'
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
      }
    },
  },
  variants: {},
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        'light': {
          'primary': '#14255b',
          'primary-focus': '#1B2963',
          'primary-content': '#ffffff',
          'secondary': '#2509B3',
          'secondary-focus': '#2E0BDD',
          'secondary-content': '#ffffff',
          'accent': '#2509B3',
          'accent-focus': '#2E0BDD',
          'accent-content': '#ffffff',
          'neutral': '#121C42',
          'neutral-focus': '#1B2963',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f3f5fc',
          'base-300': '#d1d5db',
          'base-content': '#121C42',
          'info': '#1546AF',
          'success': '#2F9316',
          'warning': '#ED9E00',
          'error': '#dc2626',
          '--rounded-btn': '.75rem',
          '*:where(.checkbox)': {
            'border-radius': '.5rem!important',
          },
          '*:where(.tooltip:before)': {
            'border-radius': '0!important',
          }
        },
        'black': {
          'primary': '#ffffff',
          'primary-focus': '#ffffff',
          'primary-content': '#000000',
          'secondary': '#ffffff',
          'secondary-focus': '#ffffff',
          'secondary-content': '#000000',
          'accent': '#ffffff',
          'accent-focus': '#ffffff',
          'accent-content': '#000000',
          'base-100': '#000000',
          'base-200': '#333333',
          'base-300': '#4d4d4d',
          'base-content': '#ffffff',
          'neutral': '#333333',
          'neutral-focus': '#4d4d4d',
          'neutral-content': '#ffffff',
          'info': '#0000ff',
          'success': '#008000',
          'warning': '#ffff00',
          'error': '#ff0000',
          '--border-color': 'var(--b3)',
          '--rounded-box': '1rem',
          '--rounded-btn': '.75rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '0',
          '--animation-input': '0',
          '--btn-text-case': 'lowercase',
          '--btn-focus-scale': '1',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px',
          '--tab-border': '1px',
          '--tab-radius': '0',
          '*:where(.checkbox)': {
            'border-radius': '.5rem!important',
          },
          '*:where(.tooltip:before)': {
            'border-radius': '.5rem!important',
          }
        },
        'forest': {
          "primary": "#1eb854",
          "primary-focus": "#178c40",
          "primary-content": "#ffffff",
          "secondary": "#1fd65f",
          "secondary-focus": "#18aa4b",
          "secondary-content": "#ffffff",
          "accent": "#d99330",
          "accent-focus": "#b57721",
          "accent-content": "#ffffff",
          'neutral': '#333333',
          'neutral-focus': '#4d4d4d',
          'neutral-content': '#ffffff',
          'base-100': '#000000',
          'base-200': '#333333',
          'base-300': '#4d4d4d',
          "base-content": "#ffffff",
          "info": "#66c6ff",
          "success": "#87d039",
          "warning": "#e2d562",
          "error": "#ff6f6f",
          "--border-color": "var(--b3)",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": ".2s",
          "--btn-text-case": "uppercase",
          "--btn-focus-scale": "0.95",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        }
      },
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
}
