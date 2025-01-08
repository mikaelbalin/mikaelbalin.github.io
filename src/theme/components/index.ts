import { Anchor, MantineThemeComponents } from "@mantine/core";
import { Button } from "./button";
import { Badge } from "./badge";
import { Chip } from "./chip";
import { Text } from "./text";
import { Title } from "./title";
import { TextInput } from "./text-input";
import { Container } from "./container";
import { Textarea } from "./textarea";
import { TypographyStylesProvider } from "./typography-styles-provider";
import { CodeHighlight } from "./code-highlight";
import { PasswordInput } from "./password-input";
import { List } from "./list";
import { Pagination } from "./pagination";

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
  TypographyStylesProvider,
  TextInput,
  Container,
  Textarea,
  CodeHighlight,
  PasswordInput,
  List,
  Pagination,
};
