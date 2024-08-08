import { cn } from "@/lib/utils";
import { Button } from "@mantine/core";

export default Button.extend({
  defaultProps: {
    variant: "default",
  },
  classNames(theme, props) {
    let root =
      "h-15 sm:h-16 text-xl sm:text-2xl transition-colors duration-300";

    switch (props.variant) {
      case "default":
        root = cn(
          root,
          "bg-black px-8 text-white hover:bg-appLightColorGreyDark hover:text-white",
          "dark:bg-white dark:text-black dark:hover:bg-appDarkColorGreyLight dark:hover:text-black",
        );
        break;

      case "outline":
        root = cn(
          root,
          "border-black text-black",
          "hover:bg-appLightColorBeige hover:text-black",
        );
        break;

      default:
        break;
    }

    return {
      root,
    };
  },
});
