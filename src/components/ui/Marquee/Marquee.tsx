import classes from "./Marquee.module.css";
import { cn } from "@/lib/utils";

function renderListItems(items: string[]) {
  return items.map((item) => (
    <li
      key={item}
      className={cn(
        classes.item,
        "relative",
        "uppercase text-9xl sm:text-10xl",
        "before:absolute before:top-1/2 before:-left-12 before:w-4 before:h-4 before:-translate-y-1/2",
        "sm:before:w-13 sm:before:h-13 sm:before:-left-33",
      )}
    >
      {item}
    </li>
  ));
}

const contentClasses = cn(
  classes.content,
  "flex shrink-0 justify-around min-w-full p-0 m-0",
  "list-none",
);

interface MarqueeProps {
  texts: string[];
}

export const Marquee = ({ texts = [] }: MarqueeProps) => {
  return (
    <div
      className={cn(classes.root, "relative flex overflow-hidden select-none")}
    >
      <ul className={contentClasses}>{renderListItems(texts)}</ul>
      <ul className={contentClasses} aria-hidden="true">
        {renderListItems(texts)}
      </ul>
    </div>
  );
};
