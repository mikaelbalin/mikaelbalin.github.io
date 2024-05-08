import {
  Switch,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import cx from "clsx";
import { IconSunHigh, IconMoon } from "@tabler/icons-react";
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
          <IconSunHigh className={cx(classes.icon, classes.dark)} stroke={3} />
          <IconMoon className={cx(classes.icon, classes.light)} stroke={3} />
        </>
      }
    />
  );
};
