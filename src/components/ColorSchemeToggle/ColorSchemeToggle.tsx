import {
  Switch,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import classes from "./ColorSchemeToggle.module.css";

export const ColorSchemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const isLightScheme = computedColorScheme === "light";

  return (
    <Switch
      checked={!isLightScheme}
      onChange={(event) => setColorScheme(isLightScheme ? "dark" : "light")}
      size="md"
      classNames={{
        track: classes.track,
        thumb: classes.thumb,
      }}
      thumbIcon={
        <>
          <IconSunHigh className={cn(classes.icon, classes.dark)} stroke={3} />
          <IconMoon className={cn(classes.icon, classes.light)} stroke={3} />
        </>
      }
    />
  );
};
