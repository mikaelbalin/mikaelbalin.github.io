import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  RefObject,
  useMemo,
} from "react";
import { MotionValue } from "motion/react";

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
  const value = useMemo(() => ({ y }), [y]);
  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
};
