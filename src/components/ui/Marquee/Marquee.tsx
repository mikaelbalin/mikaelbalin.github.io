import classes from "./Marquee.module.css";
import { cn } from "@/lib/utils";

function renderListItems(items: string[]) {
  return items.map((item) => (
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
  ));
}

interface MarqueeProps {
  texts: string[];
}

export const Marquee = ({ texts = [] }: MarqueeProps) => {
  return (
    <div
      className={cn(classes.root, "relative flex overflow-hidden select-none")}
    >
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            classes.content,
            "motion-safe:animate-scroll",
            "flex shrink-0 justify-around min-w-full p-0 m-0",
            "list-none",
          )}
          aria-hidden={index === 1}
        >
          {renderListItems(texts)}
        </div>
      ))}
    </div>
  );
};
