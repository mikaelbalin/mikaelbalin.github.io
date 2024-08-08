import { Title } from "@mantine/core";

export default Title.extend({
  classNames: (theme, { order, className }, ctx) => {
    switch (order) {
      case 1:
        return {
          root: "text-9xl sm:text-10xl",
        };
      case 2:
        return {
          root: "text-5xl sm:text-8xl",
        };
      case 3:
        return {
          root: "text-3xl sm:text-6xl",
        };
      case 4:
        return {
          root: "text-xl sm:text-4xl",
        };
      default:
        return {
          root: className,
        };
    }
  },
});
