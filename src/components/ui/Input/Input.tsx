import * as React from "react";
import { cn } from "#lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  [
    "flex h-13 w-full min-w-0 border bg-background px-4 text-base text-urban-fog dark:text-silver-mist",
    "transition-color outline-none",
    "selection:bg-primary selection:text-primary-foreground",
    "file:inline-flex file:h-13 file:border-0 file:bg-transparent file:text-base file:font-medium file:text-urban-fog dark:file:text-silver-mist",
    "placeholder:text-urban-fog dark:placeholder:text-silver-mist",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  ],
  {
    variants: {
      variant: {
        default: "border-foreground",
        filled: "border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type InputProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants>;

function Input({ className, variant, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Input };
