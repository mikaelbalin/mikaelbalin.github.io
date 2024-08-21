import { cn } from "@/lib/utils";
import { TextInput } from "@mantine/core";

export default TextInput.extend({
  defaultProps: {},
  classNames: (theme, props) => {
    const { variant } = props;

    return {
      root: "",
      label: cn("block mb-2 text-base font-normal", "sm:text-lg"),
      input: cn(
        "h-13 px-4 bg-white text-base text-appLightColorGrey placeholder:text-appLightColorGrey",
        "sm:h-13.5 sm:text-lg",
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
