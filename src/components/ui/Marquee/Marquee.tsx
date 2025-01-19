"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type SpringOptions,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/utilities/cn";
import { Fragment, useRef } from "react";
import { Footer } from "@/types/payload";

function isArrayOfStrings(texts: unknown): texts is string[] {
  return (
    Array.isArray(texts) && texts.every((item) => typeof item === "string")
  );
}

const isTuple = (titles: unknown): titles is string[][] => {
  return Array.isArray(titles) && titles.every(isArrayOfStrings);
};

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
    <Fragment key={index}>
      {(index !== 0 || (index === 0 && showFirstSeparator)) && (
        <li
          aria-hidden
          className="w-4 h-4 bg-black dark:bg-white sm:w-13 sm:h-13"
        />
      )}
      <li className={cn("relative", "text-black dark:text-white", className)}>
        {item}
      </li>
    </Fragment>
  ));
};

const BASE: number = 10;
const springConfig: SpringOptions = { stiffness: 100, damping: 30 };

interface MarqueeProps {
  titles: Footer["titles"];
}

export const Marquee = ({ titles = [] }: MarqueeProps) => {
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

  if (isArrayOfStrings(titles)) {
    return (
      <div
        ref={ref}
        className={cn(
          "[--gap:theme(spacing.8)] sm:[--gap:theme(spacing.20)]",
          "gap-[--gap]",
          "overflow-hidden",
          "relative flex select-none",
          "motion-safe:animate-show",
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
              texts={titles}
              className="text-9xl sm:text-10xl"
              showFirstSeparator
            />
          </ul>
        ))}
      </div>
    );
  } else {
    return (
      <div ref={ref} className="pt-16 pb-14 sm:pt-24 sm:pb-18">
        {isTuple(titles) &&
          titles.map((title, index) => (
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
                <Line texts={title} className="text-4.5xl sm:text-9xl" />
              </motion.ul>
            </div>
          ))}
      </div>
    );
  }
};
