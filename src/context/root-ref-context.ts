import { createContext } from "react";

export const RootRefContext =
  createContext<React.RefObject<HTMLDivElement | null> | null>(null);
