import { cn } from "#lib/utils";
import type { CalloutBlock } from "#types/payload";
import {
  IconBulb,
  IconExclamationCircle,
  IconInfoCircle,
} from "@tabler/icons-react";
import React from "react";

function renderIcon(type: CalloutBlock["style"]) {
  switch (type) {
    case "note":
      return <IconInfoCircle />;
    case "tip":
      return <IconBulb />;
    case "important":
      return <IconExclamationCircle />;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}

type CalloutProps = React.PropsWithChildren<
  Pick<CalloutBlock, "style" | "blockName">
> &
  Pick<React.HTMLProps<HTMLDivElement>, "className">;

export const Callout = (props: CalloutProps) => {
  const { style, blockName, children, className } = props;

  return (
    <div
      className={cn(
        "bg-warm-porcelain dark:bg-shadow-earth mb-6 sm:mb-8",
        className,
      )}
    >
      {blockName && (
        <div className="bg-foreground text-background flex items-center gap-2 px-4 py-2 text-base sm:px-6 sm:text-lg">
          {renderIcon(style)} {blockName}
        </div>
      )}
      <div className="px-4 py-6 text-lg sm:px-6 sm:py-8 sm:text-5xl">
        {children}
      </div>
    </div>
  );
};
