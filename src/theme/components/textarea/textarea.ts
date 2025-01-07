import { cn } from "@/utilities/cn";
import { Textarea } from "@mantine/core";

export default Textarea.extend({
  defaultProps: {},
  classNames: (theme, props) => {
    const { variant } = props;

    return {
      label: cn(
        "block mb-2 text-base font-normal",
        "sm:text-lg dark:text-white",
      ),
      input: cn(
        "p-4 bg-white dark:bg-black text-base text-appLightColorGrey dark:text-appDarkColorGreyLight",
        "placeholder:text-appLightColorGrey dark:placeholder:text-appDarkColorGreyLight",
        "sm:text-lg",
        "border-black dark:border-white",
        variant === "filled" && "border-0",
      ),
    };
  },
});
