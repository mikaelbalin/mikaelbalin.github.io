import { cn } from "#lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const titleVariants = cva([], {
  variants: {
    size: {
      1: "text-13xl sm:text-15xl",
      2: "sm:text-12xl text-8xl font-bold",
      3: "sm:text-11xl text-4xl font-bold",
      4: "sm:text-10xl text-2xl",
      5: "text-2xl sm:text-7xl",
      6: "text-5xl",
    },
  },
});

export type TitleProps = React.ComponentProps<"h1"> &
  VariantProps<typeof titleVariants> & {
    asChild?: boolean;
    /** Order of the heading element (h1-h6), defaults to 1 */
    order?: 1 | 2 | 3 | 4 | 5 | 6;
  };

export function Title({
  className,
  size,
  order = 1,
  asChild = false,
  children,
  ...props
}: TitleProps) {
  // If size is not provided, use order to determine size
  const titleSize = size || order;

  // Determine which heading element to use based on order
  const Component = asChild ? Slot : `h${order}`;

  return (
    <Component
      className={cn(titleVariants({ size: titleSize, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}
