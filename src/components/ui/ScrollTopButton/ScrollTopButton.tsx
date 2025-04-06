"use client";

import { IconArrowNarrowUp } from "@tabler/icons-react";
import {
  UnstyledButton,
  type UnstyledButtonProps,
} from "#components/ui/UnstyledButton";
import { cn } from "#lib/utils";

type ScrollTopButtonProps = Pick<UnstyledButtonProps, "className"> & {
  title: string;
};

export const ScrollTopButton = ({ title, className }: ScrollTopButtonProps) => (
  <UnstyledButton
    className={cn(className, "flex items-center gap-2 text-xl sm:text-3xl")}
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  >
    {title}
    <IconArrowNarrowUp />
  </UnstyledButton>
);
