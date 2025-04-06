"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type SpringOptions,
  useMotionTemplate,
} from "motion/react";
import { Fragment, HTMLAttributes, useRef } from "react";
import { cn } from "#lib/utils";
import { Footer } from "#types/payload";

function isSingleLine(texts: unknown): texts is string[] {
  return (
    Array.isArray(texts) && texts.every((item) => typeof item === "string")
  );
}

const isDoubleLine = (titles: unknown): titles is string[][] => {
  return Array.isArray(titles) && titles.every(isSingleLine);
};

const Line = ({
  texts,
  className,
  isSingleLine,
}: {
  texts: string[];
  className: string;
  isSingleLine?: boolean;
}) => {
  return texts.map((item, index) => (
    <Fragment key={index}>
      {(index !== 0 || (index === 0 && isSingleLine)) && (
        <li
          aria-hidden
          className={cn(
            "h-4 w-4 bg-foreground",
            isSingleLine ? "sm:h-13 sm:w-13" : "sm:h-6 sm:w-6",
          )}
        />
      )}
      <li className={cn("relative", "text-foreground", className)}>{item}</li>
    </Fragment>
  ));
};

const BASE: number = 10;
const springConfig: SpringOptions = { stiffness: 100, damping: 30 };

interface MarqueeProps
  extends Pick<HTMLAttributes<HTMLDivElement>, "className"> {
  titles: Footer["titles"];
}

export const Marquee = ({ titles = [], className }: MarqueeProps) => {
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

  if (isSingleLine(titles)) {
    return (
      <div
        ref={ref}
        className={cn(
          "[--gap:calc(var(--spacing)*8)] sm:[--gap:calc(var(--spacing)*20)]",
          "relative flex gap-[var(--gap)] overflow-hidden select-none sm:h-67.5",
          className,
        )}
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <ul
            key={index}
            className={cn(
              "gap-[var(--gap)]",
              "m-0 flex min-w-full shrink-0 items-center justify-around p-0",
              "list-none",
              "motion-safe:animate-scroll-left",
            )}
            aria-hidden={index === 1}
          >
            <Line
              texts={titles}
              className="text-13xl sm:text-15xl"
              isSingleLine
            />
          </ul>
        ))}
      </div>
    );
  } else {
    return (
      <div ref={ref} className="pt-16 pb-14 sm:pt-24 sm:pb-18">
        {isDoubleLine(titles) &&
          titles.map((title, index) => (
            <div
              key={index}
              className={cn(
                "h-12 gap-6 sm:h-31.5 sm:gap-10",
                "flex justify-center overflow-hidden select-none",
                "first:mb-2 sm:first:mb-0",
              )}
            >
              <motion.ul
                className={cn(
                  "m-0 flex min-w-full shrink-0 items-center justify-around p-0",
                  "gap-6 sm:gap-10",
                  "list-none",
                )}
                style={{
                  translateX: index % 2 === 0 ? even : odd,
                }}
              >
                <Line texts={title} className="text-9xl sm:text-14xl" />
              </motion.ul>
            </div>
          ))}
      </div>
    );
  }
};
