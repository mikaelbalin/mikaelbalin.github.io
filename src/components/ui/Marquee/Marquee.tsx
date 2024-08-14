"use client";

import { animated, useScroll, useSpring, useSprings } from "@react-spring/web";
import classes from "./Marquee.module.css";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface MarqueeProps {
  texts: string[];
  hasAnimation?: boolean;
  index?: number;
}

export const Marquee = ({ texts = [], hasAnimation, index }: MarqueeProps) => {
  const { scrollYProgress } = useScroll();

  const [springs, api] = useSprings(texts.length, (index) => ({
    transform: "translateX(0px)",
  }));

  useEffect(() => {
    api.start((index) => ({
      transform: scrollYProgress.to(
        [0, 1],
        index % 2 === 0
          ? ["translateX(0px)", "translateX(-2000px)"]
          : ["translateX(-2000px)", "translateX(0px)"],
      ),
    }));
  }, [scrollYProgress, api]);

  return (
    <div
      className={cn(classes.root, "relative flex overflow-hidden select-none")}
    >
      {Array.from({ length: 2 }).map((_, idx) => (
        <animated.ul
          key={idx}
          className={cn(
            classes.content,
            hasAnimation && "motion-safe:animate-scroll",
            "flex shrink-0 justify-around min-w-full p-0 m-0",
            "list-none",
          )}
          style={typeof index === "number" ? springs[index] : undefined}
          aria-hidden={idx === 1}
        >
          {texts.map((item) => (
            <li
              key={item}
              className={cn(
                "relative",
                "uppercase text-9xl sm:text-10xl text-black dark:text-white",
                "before:absolute before:top-1/2 before:-left-12 before:w-4 before:h-4 before:-translate-y-1/2 before:bg-black dark:before:bg-white",
                "sm:before:w-13 sm:before:h-13 sm:before:-left-33",
              )}
            >
              {item}
            </li>
          ))}
        </animated.ul>
      ))}
    </div>
  );
};
