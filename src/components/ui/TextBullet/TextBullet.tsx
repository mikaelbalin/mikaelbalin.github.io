import { PropsWithChildren } from "react";
import { Text, TextProps } from "@mantine/core";
import { cn } from "@/lib/utils";

interface TextBulletProps
  extends PropsWithChildren,
    Pick<TextProps, "size" | "className"> {}

export const TextBullet = ({ children, size, className }: TextBulletProps) => {
  return (
    <Text
      className={cn(
        "flex items-center gap-x-2",
        "before:content-[''] before:w-2 before:h-2 before:bg-black dark:before:bg-white",
        className,
      )}
      size={size}
    >
      {children}
    </Text>
  );
};
