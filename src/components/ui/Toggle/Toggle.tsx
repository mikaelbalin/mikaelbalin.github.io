"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#lib/utils";

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 text-base",
    "whitespace-nowrap transition-[color,box-shadow,background-color]",
    "outline-none data-[state=off]:hover:bg-warm-porcelain",
    "focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50",
    "cursor-pointer disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "data-[state=on]:bg-foreground data-[state=on]:text-background",
    "dark:aria-invalid:ring-destructive/40 dark:data-[state=off]:hover:bg-charcoal-ember",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: "border border-foreground bg-transparent",
      },
      size: {
        default: "h-9.5 min-w-9 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
