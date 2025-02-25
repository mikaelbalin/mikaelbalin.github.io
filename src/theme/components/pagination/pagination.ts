import { cn } from "@/lib/utils";
import { Pagination } from "@mantine/core";

export default Pagination.extend({
  classNames: {
    control: cn(
      "transition-colors",
      "border-black dark:border-white",
      "bg-white dark:bg-black",
      "data-[active=true]:bg-black dark:data-[active=true]:bg-white",
      "data-[active=true]:text-white dark:data-[active=true]:text-black",
      "hover:bg-appLightColorBeige hover:data-[active=true]:bg-appLightColorGreyDark",
      "dark:hover:bg-appDarkColorCoalBlack dark:hover:data-[active=true]:bg-appDarkColorGreyLight",
    ),
  },
});
