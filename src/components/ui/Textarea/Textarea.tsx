import * as React from "react";
import { cn } from "#lib/utils";

export type TextareaProps = React.ComponentProps<"textarea">;

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full border border-input bg-transparent p-4 text-base text-urban-fog dark:text-silver-mist",
        "transition-color outline-none",
        "placeholder:text-urban-fog dark:placeholder:text-silver-mist",
        "focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
