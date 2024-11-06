import { CodeHighlight } from "@mantine/code-highlight";

export default CodeHighlight.extend({
  defaultProps: {},
  classNames: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  vars: (theme, props) => ({
    root: {
      // "--code-background": theme.other.appLightColorBeige,
    },
  }),
});
