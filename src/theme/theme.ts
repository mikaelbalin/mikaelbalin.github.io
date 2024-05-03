"use client";

import { Anchor, DEFAULT_THEME, createTheme } from "@mantine/core";
import { Button } from "./components";

export const theme = createTheme({
  fontFamily: `Inter, ${DEFAULT_THEME.fontFamily}`,
  white: "#FDFCF9",
  black: "#101010",
  breakpoints: {
    xs: "36em", // 576px
    sm: "48em", // 768px
    md: "62em", // 992px
    lg: "75em", // 1200px
    xl: "88em", // 1408px
  },
  components: {
    Anchor: Anchor.extend({
      defaultProps: {
        underline: "never",
      },
    }),
    Button,
  },
  // primaryColor: "grape",
  defaultRadius: 0,
  colors: {},
  other: {
    appLightColorBeige: "#F0EDE7",
    appLightColorBeigeDark: "#CBC1AE",
    appLightColorGrey: "#6C6C6C",
    appLightColorGreyDark: "#343333",
    appDarkColorGreyLight: "#B7B7B7",
    appDarkColorCoalBlack: "#262523",
    appDarkColorCoalBlackLight: "#43403E",
    transitionColor: "background-color cubic-bezier(0.4, 0, 0.2, 1) 150ms",
  },
});
