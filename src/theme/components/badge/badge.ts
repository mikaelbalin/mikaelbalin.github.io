import { Badge } from "@mantine/core";

export default Badge.extend({
  defaultProps: {
    // radius: 0,
    // variant: "primary",
  },
  vars: (theme, props) => {
    return {
      root: {
        "--badge-radius": "0",
      },
    };
  },
});
