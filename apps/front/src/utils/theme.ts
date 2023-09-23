import { createTheme } from '@mui/material/styles';

// Extend the theme type to include custom properties
declare module '@mui/material/styles' {
  interface Theme {
    borders: {
      border: number;
      borderRadius: number;
      borderColor: string;
    };
    chartsTooltip: {
      background: string;
      color: string;
    };
  }
  interface ThemeOptions {
    borders?: {
      border: number;
      borderRadius: number;
      borderColor: string;
    };
    chartsTooltip?: {
      background: string;
      color: string;
    };
  }
}

// TODO: Create a theme for dark mode
const themeLight = createTheme(
  {
    palette: {
      mode: 'light',
      background: {
        default: '#f8fafc',
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
      MuiContainer: {
        defaultProps: {
          maxWidth: false,
          disableGutters: true,
          sx: {
            padding: 2,
          },
        },
      },
      MuiAppBar: {
        defaultProps: {
          color: 'inherit',
          elevation: 0,
          variant: 'outlined',
          sx: {
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          variant: 'outlined',
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
          disableElevation: true,
          sx: {
            borderRadius: '.6rem',
          },
        },
      },
      MuiToggleButtonGroup: {
        defaultProps: {
          sx: {
            '& .MuiToggleButtonGroup-grouped': {
              margin: 0.7,
              padding: 0.5,
              border: 0,
              '&.Mui-disabled': {
                border: 0,
              },
              '&:not(:first-of-type)': {
                borderRadius: 0.6,
              },
              '&:first-of-type': {
                borderRadius: 0.6,
              },
              '& .Mui-selected': {
                color: 'primary.main',
              },
            },
          },
        },
      },
      MuiStep: {
        defaultProps: {
          sx: {
            '& .MuiStepLabel-iconContainer': {
              paddingRight: 0,
              border: 'solid 1px',
              borderColor: 'divider',
              borderRadius: '50%',
            },
            '& .MuiStepIcon-root': {
              width: '1.5em',
              height: '1.5em',
            },
            '& .Mui-disabled .MuiStepIcon-root': {
              color: 'white',
            },
            '& .Mui-disabled .MuiStepIcon-text': {
              fill: '#121C42',
            },
          },
        },
      },
      MuiStepConnector: {
        defaultProps: {
          sx: {
            '&.Mui-active': {
              '& .MuiStepConnector-line': {
                borderColor: 'primary.main',
                borderStyle: 'solid',
              },
            },
            '&.Mui-completed': {
              '& .MuiStepConnector-line': {
                borderColor: 'primary.main',
                borderStyle: 'solid',
              },
            },
            '& .MuiStepConnector-line': {
              borderColor: 'divider',
              borderWidth: 1,
              borderStyle: 'dashed',
            },
          },
        },
      },
      MuiMobileStepper: {
        defaultProps: {
          sx: {
            backgroundColor: 'transparent',
          },
        },
      },
      MuiSnackbar: {
        defaultProps: {
          sx: {
            position: 'unset',
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
    chartsTooltip: {
      background: '#fff',
      color: 'rgba(0, 0, 0, 0.87)',
    },
  }
);

export default themeLight;
