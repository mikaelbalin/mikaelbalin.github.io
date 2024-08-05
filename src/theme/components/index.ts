import {
  Anchor,
  MantineThemeComponents,
  Title,
  TypographyStylesProvider,
  Text,
} from "@mantine/core";
import { Button } from "./button";
import { Badge } from "./badge";
import { Chip } from "./chip";

export const components: MantineThemeComponents = {
  Anchor: Anchor.extend({
    defaultProps: {
      underline: "never",
    },
  }),
  Button,
  Badge,
  Chip,
  Title: Title.extend({
    classNames: (theme, { order, className }, ctx) => {
      switch (order) {
        case 1:
          return {
            root: "text-9xl md:text-10xl",
          };
        case 2:
          return {
            root: "text-lg md:text-8xl",
          };
        case 3:
          return {
            root: "text-3xl md:text-6xl",
          };
        case 4:
          return {
            root: "text-xl md:text-4xl",
          };
        default:
          return {
            root: className,
          };
      }
    },
  }),
  Text: Text.extend({
    classNames(theme, props, ctx) {
      return {
        // root:
      };
    },
  }),
  TypographyStylesProvider: TypographyStylesProvider.extend({
    classNames: () => ({
      root: "",
    }),
  }),
};
