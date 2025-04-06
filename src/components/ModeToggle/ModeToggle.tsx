"use client";

import React from "react";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Switch } from "#components/ui/Switch";
import { Label } from "#components/ui/Label";
import { useMounted } from "@kaelui/hooks/useMounted";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <>
      <Switch
        id="theme-toggle"
        checked={resolvedTheme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        components={{
          root: {
            className: "h-6 w-12 bg-foreground",
          },
          thumb: {
            className:
              "flex items-center justify-center size-5 data-[state=checked]:translate-x-6",
            children: (
              <>
                <IconSunHigh className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <IconMoon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              </>
            ),
          },
        }}
      />
      <Label className="sr-only" htmlFor="theme-toggle">
        Toggle theme
      </Label>
    </>
  );
}
