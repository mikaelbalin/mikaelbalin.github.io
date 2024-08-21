import { cn } from "@/lib/utils";
import { Textarea } from "@mantine/core";

export default Textarea.extend({
  defaultProps: {},
  classNames: (theme, props) => {
    const { variant } = props;

    return {
      root: "",
      label: cn("block mb-2 text-base font-normal", "sm:text-lg"),
      input: cn(
        "p-4 bg-white text-base text-appLightColorGrey placeholder:text-appLightColorGrey",
        "sm:text-lg",
        "border-black",
        variant === "filled" && "border-0",
      ),
      description: "",
      error: "",
      required: "",
      wrapper: "",
    };
  },
});
