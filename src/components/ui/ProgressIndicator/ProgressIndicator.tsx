"use client";

import { RefObject } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Text } from "@mantine/core";

interface ProgressIndicatorProps {
  target: RefObject<HTMLDivElement>;
}

export const ProgressIndicator = ({ target }: ProgressIndicatorProps) => {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="sticky top-4 flex flex-col items-center gap-0.5">
      <Text size="sm">0</Text>
      <div className="h-50 w-0.5 bg-appLightColorBeigeDark relative">
        <motion.div
          className="bg-black absolute top-0 left-0 right-0 bottom-0 origin-top"
          style={{ scaleY }}
        />
      </div>
      <Text size="sm">100</Text>
    </div>
  );
};
