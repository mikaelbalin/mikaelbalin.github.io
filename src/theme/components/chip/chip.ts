import { cn } from "@/lib/utils";
import { Chip } from "@mantine/core";

export default Chip.extend({
  defaultProps: {
    variant: "outline",
  },
  classNames: {
    iconWrapper: "hidden",
    label: cn(
      "py-2 px-4 text-base h-auto transition-colors sm:text-lg",
      "!bg-[transparent]",
      "!border-black dark:!border-white",
      "data-[checked=true]:!bg-black dark:data-[checked=true]:!bg-white",
      "data-[checked=true]:text-white dark:data-[checked=true]:text-black",
      "hover:!bg-appLightColorBeige hover:data-[checked=true]:!bg-appLightColorGreyDark",
      "dark:hover:!bg-appDarkColorCoalBlack dark:hover:data-[checked=true]:!bg-appDarkColorGreyLight",
    ),
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  vars: (theme, props) => ({
    root: {
      "--chip-radius": "0",
    },
  }),
});
