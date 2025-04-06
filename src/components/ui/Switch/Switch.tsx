"use client";

import React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "#lib/utils";

type ComponentsProp = {
  root?: React.ComponentProps<typeof SwitchPrimitive.Root>;
  thumb?: React.ComponentProps<typeof SwitchPrimitive.Thumb>;
};

interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  components?: ComponentsProp;
}

export function Switch({
  className,
  components,
  ...props
}: Readonly<SwitchProps>) {
  const { className: rootClassName, ...rootProps } = components?.root ?? {};
  const { className: thumbClassName, ...thumbProps } = components?.thumb ?? {};

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 items-center",
        "rounded-full border-2 border-transparent",
        "shadow-xs transition-all outline-none",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className,
        rootClassName,
      )}
      {...props}
      {...rootProps}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-background",
          "shadow-lg ring-0 transition-transform",
          "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
          thumbClassName,
        )}
        {...thumbProps}
      />
    </SwitchPrimitive.Root>
  );
}
