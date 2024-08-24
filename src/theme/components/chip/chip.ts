import { cn } from "@/lib/utils";
import { Chip } from "@mantine/core";

export default Chip.extend({
  defaultProps: {
    variant: "outline",
  },
  classNames: {
    iconWrapper: "hidden",
    label: cn(
      "py-2 px-4 text-base !border-black h-auto transition-colors",
      "hover:!bg-appLightColorBeige",
      "data-[checked=true]:bg-black data-[checked=true]:text-white",
      "hover:data-[checked=true]:!bg-appLightColorGreyDark",
    ),
  },
  vars: (theme, props) => ({
    root: {
      "--chip-radius": "0",
    },
  }),
});
