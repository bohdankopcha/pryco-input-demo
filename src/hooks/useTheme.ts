import { useRouter } from "next/router";

import { createTheme } from "@mui/material";
import { getTheme } from "../lib/theme/theme";
import { borderRadius } from "../lib/theme/borders";
import { breakpoints } from "../lib/theme/breakpoints";
import { typography } from "../lib/theme/typography";
import { darkPalette, lightPalette } from "../lib/theme/palette";

export type CustomTheme = {
  lightPalette: typeof lightPalette;
  darkPalette: typeof darkPalette;
  breakpoints: typeof breakpoints;
  borderRadius: typeof borderRadius;
  typography: typeof typography;
};

type ThemeType = "dark" | "light";

export const useTheme = () => {
  const { route } = useRouter();
  const paletteMode: ThemeType = "dark";

  const togglePaletteMode = () => {};

  const getPaletteException = (): "light" | "dark" | undefined => {
    if (route === "/") return "light";
    return undefined;
  };

  let theme = createTheme(getTheme(getPaletteException() || paletteMode));
  return { theme, paletteMode, togglePaletteMode };
};
