import classes from "./Marquee.module.css";
import { cn } from "@/lib/utils";

function renderListItems(items: string[]) {
  return items.map((item) => (
    <li key={item} className={cn(classes.item, "uppercase")}>
      {item}
    </li>
  ));
}

interface MarqueeProps {
  texts: string[];
}

export const Marquee = ({ texts = [] }: MarqueeProps) => {
  return (
    <div className={classes.root}>
      <ul className={classes.content}>{renderListItems(texts)}</ul>

      <ul className={classes.content} aria-hidden="true">
        {renderListItems(texts)}
      </ul>
    </div>
  );
};
