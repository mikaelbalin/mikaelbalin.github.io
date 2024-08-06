import { cn } from "@/lib/utils";
import { Text } from "@mantine/core";

export default Text.extend({
  classNames(theme, props, ctx) {
    return {
      root: cn(
        props.size === "sm" && "text-sm",
        props.size === "md" && "text-base md:text-lg md:leading-13",
        props.size === "lg" && "text-lg leading-13 md:text-3xl md:leading-18",
        props.size === "xl" && "text-xl leading-7 md:text-2xl",
      ),
    };
  },
  defaultProps: {
    size: "md",
  },
});
