import { cn } from "#lib/utils";
import { PropsWithChildren } from "react";
import { Text, type TextProps } from "#components/ui/Text";

interface TextBulletProps
  extends PropsWithChildren,
    Pick<TextProps, "size" | "className"> {}

export const TextBullet = ({ children, size, className }: TextBulletProps) => {
  return (
    <Text
      className={cn(
        "flex items-center gap-x-2",
        "before:bg-foreground before:h-2 before:w-2 before:content-['']",
        className,
      )}
      size={size}
    >
      {children}
    </Text>
  );
};
