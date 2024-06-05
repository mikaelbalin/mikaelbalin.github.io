import { CSSVariablesResolver } from "@mantine/core";

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--app-color-beige": theme.other.appLightColorBeige,
    "--app-color-beige-dark": theme.other.appLightColorBeigeDark,
    "--app-color-grey": theme.other.appLightColorGrey,
    "--app-color-grey-dark": theme.other.appLightColorGreyDark,
    "--app-color-grey-light": theme.other.appDarkColorGreyLight,
    "--app-color-coal-black": theme.other.appDarkColorCoalBlack,
    "--app-color-coal-black-light": theme.other.appDarkColorCoalBlackLight,
    "--app-transition-color": theme.other.transitionColor,
  },
  light: {
    "--mantine-color-body": theme.white,
  },
  dark: {
    "--mantine-color-body": theme.black,
  },
});
