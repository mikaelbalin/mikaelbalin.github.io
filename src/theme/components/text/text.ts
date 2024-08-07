import { cn } from "@/lib/utils";
import { Text } from "@mantine/core";

export default Text.extend({
  classNames(theme, props, ctx) {
    return {
      root: cn(
        props.size === "sm" && "text-sm",
        props.size === "md" && "text-base sm:text-lg sm:leading-13",
        props.size === "lg" && "text-lg leading-13 sm:text-3xl sm:leading-18",
        props.size === "xl" && "text-xl leading-7 sm:text-2xl",
      ),
    };
  },
  defaultProps: {
    size: "md",
  },
});
