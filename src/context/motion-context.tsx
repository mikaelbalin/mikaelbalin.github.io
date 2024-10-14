import { createContext, PropsWithChildren, useContext, useRef } from "react";
import { MotionValue } from "framer-motion";

interface MotionContextProps {
  y: React.MutableRefObject<MotionValue<number> | undefined>;
}

const MotionContext = createContext<MotionContextProps | undefined>(undefined);

export const useMotionContext = () => {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error("useMotionContext must be used within a MotionProvider");
  }
  return context;
};

export const MotionProvider = ({ children }: PropsWithChildren) => {
  const y = useRef<MotionValue<number> | undefined>(undefined);
  return (
    <MotionContext.Provider value={{ y }}>{children}</MotionContext.Provider>
  );
};
