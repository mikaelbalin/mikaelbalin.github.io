import { Anchor, MantineThemeComponents, Code, Kbd } from "@mantine/core";
import { Button } from "./button";
import { Badge } from "./badge";
import { Chip } from "./chip";
import { Text } from "./text";
import { Title } from "./title";
import { TextInput } from "./text-input";
import { Container } from "./container";
import { Textarea } from "./textarea";
import { TypographyStylesProvider } from "./typography-styles-provider";
import { PasswordInput } from "./password-input";
import { List } from "./list";
import { Pagination } from "./pagination";
import { cn } from "@/lib/utils";

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
  PasswordInput,
  List,
  Pagination,
  Code: Code.extend({
    classNames: (_, { className }) => ({
      root: cn("text-[0.75em]", className),
    }),
  }),
  Kbd: Kbd.extend({
    classNames: (_, { className }) => ({
      root: cn("text-[0.65em]", className),
    }),
  }),
};
