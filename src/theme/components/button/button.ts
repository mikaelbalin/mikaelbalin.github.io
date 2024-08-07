import { cn } from "@/lib/utils";
import { Button } from "@mantine/core";

export default Button.extend({
  defaultProps: {
    variant: "default",
  },
  classNames(theme, props) {
    console.log({ props });
    return {
      root: cn(
        "bg-black h-15 px-8 text-xl text-white sm:h-16 sm:text-2xl hover:bg-appLightColorGreyDark hover:text-white transition-colors duration-300",
        "dark:bg-white dark:text-black dark:hover:bg-appDarkColorGreyLight dark:hover:text-black",
      ),
    };
  },
});
