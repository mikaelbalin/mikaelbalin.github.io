import { cn } from "@/lib/utils";
import { TextInput } from "@mantine/core";

export default TextInput.extend({
  defaultProps: {},
  classNames: (theme, props) => {
    return {
      root: "",
      label: "block text-base mb-2",
      input: cn(
        "h-13 px-4 border-0 text-base text-appLightColorGrey placeholder:text-appLightColorGrey",
        "sm:h-13.5",
      ),
      description: "",
      error: "",
      required: "",
      wrapper: "",
    };
  },
});
