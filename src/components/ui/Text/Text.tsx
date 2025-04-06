import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#lib/utils";

const textVariants = cva([], {
  variants: {
    size: {
      sm: "text-sm",
      base: "text-base sm:text-lg",
      lg: "text-lg sm:text-5xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
  },
});

export type TextProps = React.ComponentProps<"p"> &
  VariantProps<typeof textVariants> & {
    asChild?: boolean;
  };

export function Text({
  className,
  size,
  weight,
  asChild = false,
  children,
  ...props
}: TextProps) {
  const Component = asChild ? Slot : "p";

  return (
    <Component
      className={cn(textVariants({ size, weight, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}
