import { createTheme } from "@mui/material/styles";
import type { OverridableStringUnion } from "../utils/interfaces";
import colorPalette, { type ColorsComponents } from "./colorPalette";
import componentsTheme from "./components";
import { themeLight } from "./themesList";

// Extend the theme type to include custom properties
declare module "@mui/material/styles" {
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

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    selected: true;
  }
}

declare module "@mui/material/ToggleButton" {
  interface ToggleButtonOwnProps {
    variant?: OverridableStringUnion<"default" | "rounded">;
  }

  // Extends colors choose
  interface ToggleButtonPropsColorOverrides extends ColorsComponents {}

  // biome-ignore lint/suspicious/noEmptyInterface:
  interface ToggleButtonPropsVariantOverrides {}
}

declare module "@mui/material/Slider" {
  interface SliderOwnProps {
    variant?: OverridableStringUnion<"default" | "rail">;
  }

  // Extends colors choose
  interface SliderPropsColorOverrides extends ColorsComponents {}

  // biome-ignore lint/suspicious/noEmptyInterface:
  interface SliderPropsVariantOverrides {}
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    caption2: true;
  }

  // Extends colors choose
  interface ToggleButtonPropsColorOverrides extends ColorsComponents {}

  interface TypographyOwnProps {
    color?: OverridableStringUnion<"standard" | "primary" | "secondary" | "error" | "info" | "success" | "warning", ToggleButtonPropsColorOverrides>;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    caption2: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    caption2?: React.CSSProperties;
  }

  // Extends colors choose
  interface TypographyPropsColorOverrides extends ColorsComponents {}
}

// TODO: Handle multiple themes
const theme = createTheme(colorPalette, componentsTheme, themeLight);

export default theme;
