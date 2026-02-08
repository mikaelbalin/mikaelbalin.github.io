import type { MotionValue } from "motion/react";
import {
  createContext,
  type PropsWithChildren,
  type RefObject,
  useContext,
  useMemo,
  useRef,
} from "react";

interface MotionContextProps {
  y: RefObject<MotionValue<number> | undefined>;
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
  const value = useMemo(() => ({ y }), []);
  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
};
