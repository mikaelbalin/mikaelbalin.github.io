"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type SpringOptions,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";

function isArrayOfStrings(
  texts: string[] | [string[], string[]],
): texts is string[] {
  return (
    Array.isArray(texts) && texts.every((item) => typeof item === "string")
  );
}

const Line = ({
  texts,
  className,
  showFirstSeparator,
}: {
  texts: string[];
  className: string;
  showFirstSeparator?: boolean;
}) => {
  return texts.map((item, index) => (
    <>
      {(index !== 0 || (index === 0 && showFirstSeparator)) && (
        <li
          aria-hidden
          className="w-4 h-4 bg-black dark:bg-white sm:w-13 sm:h-13"
        />
      )}
      <li
        key={item}
        className={cn("relative", "text-black dark:text-white", className)}
      >
        {item}
      </li>
    </>
  ));
};

const BASE: number = 10;
const springConfig: SpringOptions = { stiffness: 100, damping: 30 };

interface MarqueeProps {
  texts: string[] | [string[], string[]];
}

export const Marquee = ({ texts = [] }: MarqueeProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "start end"],
  });

  const transformEven = useTransform(scrollYProgress, [0, 1], [-BASE, BASE]);
  const transformOdd = useTransform(scrollYProgress, [0, 1], [BASE, -BASE]);

  const transformEvenSpring = useSpring(transformEven, springConfig);
  const transformOddSpring = useSpring(transformOdd, springConfig);

  const even = useMotionTemplate`${transformEvenSpring}%`;
  const odd = useMotionTemplate`${transformOddSpring}%`;

  if (isArrayOfStrings(texts)) {
    return (
      <div
        className={cn(
          "[--gap:theme(spacing.8)] sm:[--gap:theme(spacing.20)]",
          "gap-[--gap]",
          "overflow-hidden",
          "relative flex select-none",
        )}
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <ul
            key={index}
            className={cn(
              "motion-safe:animate-scroll",
              "gap-[--gap]",
              "flex shrink-0 justify-around items-center min-w-full p-0 m-0",
              "list-none",
            )}
            aria-hidden={index === 1}
          >
            <Line
              texts={texts}
              className="text-9xl sm:text-10xl"
              showFirstSeparator
            />
          </ul>
        ))}
      </div>
    );
  } else {
    return (
      <div ref={ref}>
        {texts.map((text, index) => (
          <div
            key={index}
            className={cn(
              "gap-8 sm:gap-20",
              "flex justify-center overflow-hidden select-none",
            )}
          >
            <motion.ul
              className={cn(
                "flex shrink-0 justify-around items-center min-w-full p-0 m-0",
                "gap-8 sm:gap-20",
                "list-none",
              )}
              style={{
                translateX: index % 2 === 0 ? even : odd,
              }}
            >
              <Line texts={text} className="text-4.5xl sm:text-9xl" />
            </motion.ul>
          </div>
        ))}
      </div>
    );
  }
};
