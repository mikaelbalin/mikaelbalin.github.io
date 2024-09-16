import { cn } from "@/lib/utils";
import { PasswordInput } from "@mantine/core";

export default PasswordInput.extend({
  defaultProps: {},
  classNames: (theme, props) => {
    const { variant } = props;

    return {
      label: cn(
        "block mb-2 text-base font-normal",
        "sm:text-lg dark:text-white",
      ),
      input: cn(
        "h-13",
        "text-base text-appLightColorGrey dark:text-appDarkColorGreyLight",
        "sm:h-13.5 sm:text-lg",
        "border-black dark:border-white",
        variant === "filled" && "border-0",
      ),
      innerInput: cn(
        "px-4",
        "bg-white dark:bg-black",
        "placeholder:text-appLightColorGrey dark:placeholder:text-appDarkColorGreyLight",
      ),
    };
  },
});
