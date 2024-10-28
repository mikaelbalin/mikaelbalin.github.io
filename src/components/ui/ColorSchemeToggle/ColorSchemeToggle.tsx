import {
  Switch,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import classes from "./ColorSchemeToggle.module.css";
import { ChangeEventHandler } from "react";

export const ColorSchemeToggle = () => {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const isLightScheme = computedColorScheme === "light";

  const toggleColorScheme: ChangeEventHandler<HTMLInputElement> = () =>
    setColorScheme(isLightScheme ? "dark" : "light");

  return (
    <Switch
      checked={!isLightScheme}
      onChange={toggleColorScheme}
      size="md"
      classNames={{
        track: classes.track,
        thumb: classes.thumb,
      }}
      thumbIcon={
        <>
          <IconSunHigh
            className={cn("w-3 h-3 color-black", classes.dark)}
            stroke={3}
          />
          <IconMoon
            className={cn("w-3 h-3 color-white", classes.light)}
            stroke={3}
          />
        </>
      }
    />
  );
};
