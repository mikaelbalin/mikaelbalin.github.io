"use client";

import React from "react";
import { UnstyledButton } from "#components/ui/UnstyledButton";

type ShareButtonProps = React.PropsWithChildren<
  Pick<React.ComponentProps<"button">, "onClick">
>;

export const ShareButton = ({ children, onClick }: ShareButtonProps) => (
  <UnstyledButton className="text-xl sm:text-3xl" onClick={onClick}>
    {children}
  </UnstyledButton>
);
