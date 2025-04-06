"use client";

import { Text } from "#components/ui/Text";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

interface ProgressIndicatorProps {
  targetId: string;
}

/**
 * Tip: `useMotionValueEvent` is a hook that allows you to listen to changes in a `motionValue` and execute a callback function when the value changes.
 */
export const ProgressIndicator = ({ targetId }: ProgressIndicatorProps) => {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    elementRef.current = document.getElementById(targetId);
  }, [targetId]);

  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="sticky top-4 flex flex-col items-center gap-2">
      <Text size="sm">0</Text>
      <div className="h-50 bg-aged-sandstone dark:bg-ironwood relative w-0.5">
        <motion.div
          className="bg-foreground absolute bottom-0 left-0 right-0 top-0 origin-top"
          style={{ scaleY }}
        />
      </div>
      <Text size="sm">100</Text>
    </div>
  );
};
