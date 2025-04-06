import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#lib/utils";

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2",
    "whitespace-nowrap transition-[color,box-shadow] outline-none",
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "cursor-pointer disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "transition-colors duration-300 ease-in-out",
    "active:translate-y-px",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-charcoal-ember dark:hover:bg-silver-mist",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-13 px-8 py-4 text-base",
        lg: "h-15 px-8 py-4 text-xl sm:text-3xl",
        icon: "size-9",
      },
      fullWidth: {
        true: "w-full",
        false: null,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
    compoundVariants: [
      {
        variant: "outline",
        size: "default",
        className: "",
      },
    ],
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Button contents */
    label?: React.ReactNode;
    /** Full width button */
    fullWidth?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  label,
  children,
  disabled,
  fullWidth,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      disabled={disabled}
      {...props}
    >
      {label || children}
    </Comp>
  );
}

export { Button, buttonVariants };
