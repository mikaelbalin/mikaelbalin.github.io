import { cn } from "@/lib/utils";
import { Button } from "@mantine/core";

export default Button.extend({
  defaultProps: {
    variant: "default",
  },
  classNames(_, { size, variant, rightSection }) {
    let root = "transition-colors duration-300 font-normal leading-7";

    if (size === "xs") {
      root = cn(root, "h-13 sm:h-13.5 text-base sm:text-lg leading-[1.24]");
    } else if (variant === "transparent") {
      root = cn(root, "h-auto text-xl px-0 sm:text-2xl");
    } else {
      root = cn(root, "h-15 sm:h-15.5 text-xl sm:text-2xl");
    }

    switch (variant) {
      case "default":
        root = cn(
          root,
          "px-8",
          "bg-black text-white hover:bg-appLightColorGreyDark hover:text-white",
          "dark:bg-white dark:text-black dark:hover:bg-appDarkColorGreyLight dark:hover:text-black",
        );
        break;

      case "outline":
        root = cn(
          root,
          "px-8",
          "border-black dark:border-white text-black dark:text-white",
          "hover:bg-appLightColorBeige dark:hover:bg-appDarkColorCoalBlack hover:text-black dark:hover:text-white",
        );
        break;

      case "transparent":
        root = cn(
          root,
          "text-black dark:text-white hover:text-appLightColorGrey dark:hover:text-appDarkColorGreyLight",
        );
        break;

      default:
        break;
    }

    return {
      root,
      section: cn(rightSection && "ml-2"),
    };
  },
});
