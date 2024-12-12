"use client";

import { FC } from "react";
import type { Header } from "@/payload-types";
import { HeaderNav } from "./Nav";

interface HeaderClientProps {
  header: Header;
}

export const HeaderClient: FC<HeaderClientProps> = ({ header }) => {
  return (
    <header className="container relative z-20">
      <HeaderNav header={header} />
    </header>
  );
};
