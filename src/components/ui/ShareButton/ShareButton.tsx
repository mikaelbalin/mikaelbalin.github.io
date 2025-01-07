"use client";

import { UnstyledButton } from "@mantine/core";
import React from "react";

type ShareButtonProps = React.PropsWithChildren<{
  onClick?: () => void;
}>;

export const ShareButton = ({ children, onClick }: ShareButtonProps) => (
  <UnstyledButton className="text-xl" onClick={onClick}>
    {children}
  </UnstyledButton>
);
