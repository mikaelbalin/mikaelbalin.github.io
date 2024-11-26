"use client";

import { Button, ButtonProps } from "@mantine/core";
import { IconArrowNarrowUp } from "@tabler/icons-react";

type ScrollTopButtonProps = Pick<ButtonProps, "className"> & {
  title: string;
};

export const ScrollTopButton = ({ title, className }: ScrollTopButtonProps) => (
  <Button
    rightSection={<IconArrowNarrowUp />}
    variant="transparent"
    className={className}
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  >
    {title}
  </Button>
);
