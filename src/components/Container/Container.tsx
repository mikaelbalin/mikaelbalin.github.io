import { Slot } from "@radix-ui/react-slot";
import { cn } from "#lib/utils";

export type ContainerProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

export const Container = ({
  asChild,
  children,
  className,
  ...props
}: ContainerProps) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="container"
      className={cn("mx-auto max-w-320 px-4 sm:px-20", className)}
      {...props}
    >
      {children}
    </Comp>
  );
};
