import {
  Anchor,
  MantineThemeComponents,
  Title,
  TypographyStylesProvider,
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
    classNames: (theme, { order }, ctx) => {
      switch (order) {
        case 2:
          return {
            root: "title-lg",
          };
        case 3:
          return {
            root: "title-md",
          };
        case 4:
          return {
            root: "title-sm",
          };
        default:
          return {
            root: "title-sm",
          };
      }
    },
  }),
  TypographyStylesProvider: TypographyStylesProvider.extend({
    classNames: () => ({
      root: "",
    }),
  }),
};
