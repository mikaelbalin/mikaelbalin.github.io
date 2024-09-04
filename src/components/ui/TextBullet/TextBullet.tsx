import { PropsWithChildren } from "react";
import { Text } from "@mantine/core";
import { cn } from "@/lib/utils";

interface TextBulletProps extends PropsWithChildren {}

export const TextBullet = ({ children }: TextBulletProps) => {
  return (
    <Text
      className={cn(
        "flex items-center gap-x-2",
        "before:content-[''] before:w-2 before:h-2 before:bg-black",
      )}
    >
      {children}
    </Text>
  );
};
