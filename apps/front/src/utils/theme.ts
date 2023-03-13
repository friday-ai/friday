import { createTheme } from '@mui/material/styles';

// Extend the theme type to include custom properties
declare module '@mui/material/styles' {
  interface Theme {
    borders: {
      border: number;
      borderRadius: number;
      borderColor: string;
    };
  }
  interface ThemeOptions {
    borders?: {
      border: number;
      borderRadius: number;
      borderColor: string;
    };
  }
}

// TODO: Create a theme for dark mode
const themeLight = createTheme(
  {
    palette: {
      mode: 'light',
      background: {
        default: '#f3f5fc',
        paper: '#ffffff',
      },
      primary: {
        main: '#121C42',
      },
      secondary: {
        main: '#a19267',
      },
      error: {
        main: '#ba1a1a',
      },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          color: 'inherit',
          elevation: 0,
          variant: 'outlined',
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 4,
        },
      },
      MuiCardContent: {
        defaultProps: {
          sx: {
            padding: '2rem',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          sx: {
            borderRadius: '.6rem',
          },
        },
      },
      MuiToggleButtonGroup: {
        defaultProps: {
          sx: {
            '& .MuiToggleButtonGroup-grouped': {
              margin: 0.8,
              border: 0,
              padding: 0.8,
              textTransform: 'capitalize',
              '&.Mui-selected': {
                color: '#121C42',
                backgroundColor: 'rgb(18 28 66 / .1)',
              },
              '&:not(:first-of-type)': {
                borderRadius: 0.6,
              },
              '&:first-of-type': {
                borderRadius: 0.6,
              },
            },
          },
        },
      },
    },
  },
  // Add custom properties
  {
    borders: {
      border: 1,
      borderRadius: 0.8,
      borderColor: 'divider',
    },
  }
);

export default themeLight;
