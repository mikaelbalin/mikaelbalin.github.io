"use client";

import { animated, useScroll, useSpring, useSprings } from "@react-spring/web";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";

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
        className={cn(
          "relative",
          "uppercase text-black dark:text-white",
          className,
        )}
      >
        {item}
      </li>
    </>
  ));
};

interface MarqueeProps {
  texts: string[] | [string[], string[]];
}

export const Marquee = ({ texts = [] }: MarqueeProps) => {
  const { ref, entry } = useIntersection({
    threshold: 0,
  });
  const isIntersecting = entry?.isIntersecting;

  const { scrollYProgress } = useScroll();

  const [springs, api] = useSprings(texts.length, (index) => ({
    transform: "translateX(0px)",
  }));

  useEffect(() => {
    if (isIntersecting) {
      api.start((index) => ({
        transform: scrollYProgress.to(
          [0, 1],
          index % 2 === 0
            ? ["translateX(13%)", "translateX(-13%)"]
            : ["translateX(-13%)", "translateX(13%)"],
        ),
      }));
    } else {
      api.stop();
    }
  }, [scrollYProgress, api, isIntersecting]);

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
      <div className={cn(entry?.isIntersecting ? "bg-[green]" : "")} ref={ref}>
        {texts.map((text, index) => (
          <div
            key={index}
            className={cn(
              "gap-8 sm:gap-20",
              "flex justify-center overflow-hidden select-none",
            )}
          >
            <animated.ul
              className={cn(
                "flex shrink-0 justify-around items-center min-w-full p-0 m-0",
                "gap-8 sm:gap-20",
                "list-none",
              )}
              style={springs[index]}
            >
              <Line texts={text} className="text-4.5xl sm:text-9xl" />
            </animated.ul>
          </div>
        ))}
      </div>
    );
  }
};
