import React from "react";
import { cn } from "#lib/utils";
import { UnstyledButton } from "#components/ui/UnstyledButton";
import { Slot } from "@radix-ui/react-slot";

const classNames: string[] = [
  "transform-(--burger-line-top-transform) motion-reduce:transition-transform",
  "opacity-0 motion-reduce:transition-opacity",
  "transform-(--burger-line-bottom-transform) motion-reduce:transition-transform",
];

export type BurgerProps = React.ComponentProps<"button"> & {
  opened: boolean;
  asChild?: boolean;
};

export const Burger: React.FC<BurgerProps> = ({
  opened,
  onClick,
  className,
  asChild,
  ...props
}) => {
  const Comp = asChild ? Slot : UnstyledButton;

  return (
    <Comp
      className={cn("flex h-8 w-8 flex-col justify-around", className)}
      onClick={onClick}
      aria-label="Toggle navigation"
      {...props}
    >
      {classNames.map((className) => (
        <div
          key={className}
          className={cn(
            "h-px w-full bg-foreground duration-300 ease-in-out",
            opened && className,
          )}
        />
      ))}
      <span className="sr-only">Toggle navigation</span>
    </Comp>
  );
};
