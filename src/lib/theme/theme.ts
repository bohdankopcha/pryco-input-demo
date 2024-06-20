import { CSSProperties } from "react";
import { typography } from "./typography";
import { borderRadius } from "./borders";
import { breakpoints } from "./breakpoints";
import { lightPalette, darkPalette } from "./palette";
import { PaletteMode } from "@mui/material";

export const getTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light" ? lightPalette : darkPalette),
  },
  breakpoints,
  borderRadius,
  typography,
});

declare module "@mui/material/Typography" {
  export interface TypographyPropsVariantOverrides {}
}

declare module "@mui/material/styles" {
  export interface ThemeOptions {
    borderRadius: {
      xxs: string;
      xs: string;
      sm: string;
      xsm: string;
      custom: string;
      ms: string;
      md: string;
      lg: string;
    };
  }
  export interface Theme {
    borderRadius: {
      xxs: string;
      xxl: string;
      xs: string;
      sm: string;
      xsm: string;
      custom: string;
      ms: string;
      md: string;
      lg: string;
    };
  }
  export interface TypographyVariants {}

  export interface TypographyVariantsOptions {}

  interface PaletteColor {
    light: string;
    main: string;
    dark: string;
    transparent: string;
    text: string;
  }

  interface CustomPalette {
    primary: {
      main: string;
      dark: string;
      text: string;
    };
    secondary: {
      main: string;
    };
    success: {
      light: string;
      main: string;
      dark: string;
    };
    accent: any;
    warning: any;
    shadow: {
      light: string;
      main: string;
      lightBlue: string;
    };
    error: {
      light: string;
      main: string;
      dark: string;
    };
    gray: {
      100: string;
      200: string;
      300: string;
      500: string;
      600: string;
    };
    black: {
      light: string;
      main: string;
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Palette extends CustomPalette {
    accent: PaletteColor;
    warning: PaletteColor;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface PaletteOptions extends CustomPalette {}
}
