import {
  Anchor,
  MantineThemeComponents,
  TypographyStylesProvider,
} from "@mantine/core";
import { Button } from "./button";
import { Badge } from "./badge";
import { Chip } from "./chip";
import { Text } from "./text";
import { Title } from "./title";
import { TextInput } from "./text-input";
import { Container } from "./container";
import { Textarea } from "./textarea";

export const components: MantineThemeComponents = {
  Anchor: Anchor.extend({
    defaultProps: {
      underline: "never",
    },
  }),
  Button,
  Badge,
  Chip,
  Title,
  Text,
  TypographyStylesProvider: TypographyStylesProvider.extend({
    classNames: (theme, props) => ({
      root: "",
    }),
  }),
  TextInput,
  Container,
  Textarea,
};
