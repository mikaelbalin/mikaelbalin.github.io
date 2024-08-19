import { cn } from "@/lib/utils";
import { Textarea } from "@mantine/core";

export default Textarea.extend({
  defaultProps: {},
  classNames: (theme, props) => {
    const { variant } = props;

    return {
      root: "",
      label: "block text-base mb-2",
      input:
        variant === "filled"
          ? cn(
              "px-4 border-0 text-base text-appLightColorGrey placeholder:text-appLightColorGrey",
            )
          : cn(""),
      description: "",
      error: "",
      required: "",
      wrapper: "",
    };
  },
});
