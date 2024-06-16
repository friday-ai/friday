import { createTheme } from "@mui/material";

const themeLight = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    primary: {
      main: "#121C42",
    },
    secondary: {
      main: "#a19267",
    },
    error: {
      main: "#ba1a1a",
    },
    text: {
      primary: "#000",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    caption2: {
      fontSize: ".6rem",
      fontWeight: 500,
      opacity: 0.7,
    },
  },
  // Add custom properties
  borders: {
    border: 1,
    borderRadius: 0.8,
    borderColor: "divider",
  },
  chartsTooltip: {
    background: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
  },
});

// TODO: Create a theme for dark mode

export { themeLight };
