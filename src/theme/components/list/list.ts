import { cn } from "@/utilities/cn";
import { List } from "@mantine/core";

export default List.extend({
  classNames: (theme, props) => {
    const { type } = props;
    return {
      root: cn(
        type === "ordered" ? "list-decimal" : "list-disc",
        "pb-4",
        "text-base sm:text-lg sm:leading-13",
      ),
    };
  },
});
