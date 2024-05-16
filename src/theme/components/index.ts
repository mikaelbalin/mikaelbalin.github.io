import { Anchor, MantineThemeComponents } from "@mantine/core";
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
};
