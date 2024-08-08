import { Badge } from "@mantine/core";

export default Badge.extend({
  defaultProps: {
    radius: 0,
  },
  classNames: (theme, props) => {
    return {
      root: "bg-white border border-appLightColorGrey",
      label: "text-sm text-appLightColorGrey normal-case",
    };
  },
});
