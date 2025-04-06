import { cn } from "#lib/utils";

export type UnstyledButtonProps = React.ComponentProps<"button">;

export const UnstyledButton = ({
  className,
  children,
  ...props
}: UnstyledButtonProps) => {
  return (
    <button
      className={cn("cursor-pointer border-none bg-transparent p-0", className)}
      {...props}
    >
      {children}
    </button>
  );
};
