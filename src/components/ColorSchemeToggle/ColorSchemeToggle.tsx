import {
  Switch,
  useMantineTheme,
  rem,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { IconSunHigh, IconMoon } from "@tabler/icons-react";
import classes from "./ColorSchemeToggle.module.css";

export const ColorSchemeToggle = () => {
  const theme = useMantineTheme();
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
        isLightScheme ? (
          <IconSunHigh
            style={{ width: rem(12), height: rem(12) }}
            color="#101010"
            stroke={3}
          />
        ) : (
          <IconMoon
            style={{ width: rem(12), height: rem(12) }}
            color={theme.white}
            stroke={3}
          />
        )
      }
    />
  );
};
