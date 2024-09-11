import { Badge } from "@mantine/core";

export default Badge.extend({
  defaultProps: {
    radius: 0,
  },
  classNames: (theme, props) => {
    const { size } = props;
    return size === "lg"
      ? {
          root: "py-2 px-4 bg-white border border-black h-auto",
          label:
            "text-black normal-case text-base font-normal tracking-normal sm:text-lg",
        }
      : {
          root: "py-1 px-2 bg-white border border-appLightColorGrey h-auto",
          label:
            "text-sm text-appLightColorGrey normal-case font-normal tracking-normal",
        };
  },
});
