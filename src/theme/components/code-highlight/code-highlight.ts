import { CodeHighlight } from "@mantine/code-highlight";

export default CodeHighlight.extend({
  defaultProps: {},
  classNames: {},
  vars: (theme, props) => ({
    root: {
      "--code-background": theme.other.appLightColorBeige,
    },
  }),
});
