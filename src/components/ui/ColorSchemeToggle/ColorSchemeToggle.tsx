"use client";

import {
  Switch,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ChangeEventHandler } from "react";

export const ColorSchemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
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
      suppressHydrationWarning
      wrapperProps={{ suppressHydrationWarning: true }}
      size="md"
      classNames={{
        track: "bg-black dark:bg-white text-black dark:text-white border-0",
        thumb: "bg-white dark:bg-black border-white dark:border-black",
        label: "sr-only",
      }}
      thumbIcon={
        <>
          <IconSunHigh
            className={cn("w-3 h-3 color-black block dark:hidden")}
            stroke={3}
          />
          <IconMoon
            className={cn("w-3 h-3 color-white hidden dark:block")}
            stroke={3}
          />
        </>
      }
      label="Toggle color scheme"
    />
  );
};
