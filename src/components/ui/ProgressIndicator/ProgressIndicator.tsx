"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Text } from "@mantine/core";

interface ProgressIndicatorProps {
  targetId: string;
}

/**
 * `useMotionValueEvent` is a hook that allows you to listen to changes in a `motionValue` and execute a callback function when the value changes.
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
    <div className="sticky top-4 flex flex-col items-center gap-0.5">
      <Text size="sm">0</Text>
      <div className="h-50 w-0.5 bg-appLightColorBeigeDark dark:bg-appDarkColorCoalBlackLight relative">
        <motion.div
          className="bg-appLightColorGreyDark dark:bg-white absolute top-0 left-0 right-0 bottom-0 origin-top"
          style={{ scaleY }}
        />
      </div>
      <Text size="sm">100</Text>
    </div>
  );
};
