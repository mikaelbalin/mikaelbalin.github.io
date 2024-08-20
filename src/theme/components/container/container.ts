import { cn } from "@/lib/utils";
import { Container, rem } from "@mantine/core";

const CONTAINER_SIZES: Record<string, string> = {
  sm: rem(420),
  md: rem(1280),
};

export default Container.extend({
  defaultProps: {
    size: "md",
  },
  classNames: (_, { className }) => ({
    root: cn("md:px-20", className),
  }),
  vars: (_, { size, fluid }) => ({
    root: {
      "--container-size": fluid
        ? "100%"
        : size !== undefined && size in CONTAINER_SIZES
          ? CONTAINER_SIZES[size]
          : rem(size),
    },
  }),
});
