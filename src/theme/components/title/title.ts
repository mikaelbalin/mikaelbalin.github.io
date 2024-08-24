import { Title } from "@mantine/core";

export default Title.extend({
  classNames: (theme, { order, className, size }, ctx) => {
    const titleSize = size !== undefined ? size : `h${order}`;

    switch (titleSize) {
      case "h1":
        return {
          root: "text-9xl sm:text-10xl font-normal",
        };
      case "h2":
        return {
          root: "text-5xl sm:text-8xl",
        };
      case "h3":
        return {
          root: "text-3xl leading-16 sm:text-6xl sm:leading-21",
        };
      case "h4":
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
