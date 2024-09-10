import { cn } from "@/lib/utils";
import { TypographyStylesProvider } from "@mantine/core";

export default TypographyStylesProvider.extend({
  defaultProps: {},
  classNames: (theme, props) => ({
    root: "",
  }),
});
