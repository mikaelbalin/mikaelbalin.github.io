import { Badge } from "@mantine/core";

export default Badge.extend({
  defaultProps: {
    radius: 0,
  },
  classNames: (theme, props) => {
    const { size } = props;
    return size === "lg"
      ? {
          root: "py-2 px-4 bg-white dark:bg-black border border-black dark:border-white h-auto",
          label:
            "text-black dark:text-white normal-case text-base font-normal tracking-normal sm:text-lg",
        }
      : {
          root: "py-1 px-2 border border-appLightColorGrey dark:border-appDarkColorGreyLight h-auto",
          label:
            "text-sm text-appLightColorGrey dark:text-appDarkColorGreyLight normal-case font-normal tracking-normal",
        };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  vars: (theme, props) => ({
    root: {
      "--badge-bg": "transparent",
    },
  }),
});
