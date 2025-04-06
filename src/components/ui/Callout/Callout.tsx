import {
  IconInfoCircle,
  IconBulb,
  IconExclamationCircle,
} from "@tabler/icons-react";
import type { CalloutBlock } from "#types/payload";
import React from "react";

function getIcon(type: CalloutBlock["style"]) {
  switch (type) {
    case "note":
      return IconInfoCircle;
    case "tip":
      return IconBulb;
    case "important":
      return IconExclamationCircle;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}

type CalloutProps = React.PropsWithChildren<
  Pick<CalloutBlock, "style" | "blockName">
>;

export const Callout = (props: CalloutProps) => {
  const { style, blockName, children } = props;
  const Icon = getIcon(style);

  return (
    <div className="bg-warm-porcelain dark:bg-shadow-earth mb-8 sm:mb-14">
      {blockName && (
        <div className="bg-foreground text-background flex items-center gap-2 px-4 py-2 text-base sm:px-6 sm:text-lg">
          <Icon /> {blockName}
        </div>
      )}
      <div className="px-4 py-6 text-lg sm:px-6 sm:py-8 sm:text-5xl">
        {children}
      </div>
    </div>
  );
};
