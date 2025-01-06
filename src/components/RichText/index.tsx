import { cn } from "@/utilities/cn";
import React from "react";
import { serializeLexical, type NodeTypes } from "./serialize";
import { Post } from "@/payload-types";

type RichTextProps = {
  className?: string;
  content: Post["content"];
  enableGutter?: boolean;
  enableProse?: boolean;
};

const RichText: React.FC<RichTextProps> = ({
  className,
  content,
  enableGutter = true,
  enableProse = true,
}) => {
  if (!content) {
    return null;
  }

  return (
    <div
      className={cn(
        {
          "container ": enableGutter,
          "max-w-none": !enableGutter,
          "mx-auto prose dark:prose-invert ": enableProse,
        },
        className,
      )}
    >
      {content &&
        !Array.isArray(content) &&
        typeof content === "object" &&
        "root" in content &&
        serializeLexical({ nodes: content?.root?.children as NodeTypes[] })}
    </div>
  );
};

export default RichText;
