import { cn } from "@/lib/utils";
import { Button } from "@mantine/core";

export default Button.extend({
  defaultProps: {},
  classNames(theme, props) {
    // console.log({ props });
    return {
      root: cn(
        "bg-black h-15 px-8 text-xl sm:h-16 sm:text-2xl hover:bg-appLightColorGreyDark transition-colors",
        "dark:bg-white dark:text-black",
      ),
    };
  },
});
