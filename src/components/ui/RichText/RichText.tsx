import { ElementType, FC, Fragment } from "react";
import { serializeLexical } from "./serialize";
import { Post } from "@/types/payload";
import { NodeType } from "./types";

type RichTextProps = {
  className?: string;
  textClassName?: string;
  content: Post["content"];
  htmlElement?: ElementType;
};

export const RichText: FC<RichTextProps> = ({ textClassName, content }) => {
  if (!content) {
    return null;
  }

  return (
    <>
      {content &&
        !Array.isArray(content) &&
        typeof content === "object" &&
        "root" in content &&
        serializeLexical({
          nodes: content?.root?.children as NodeType[],
          className: textClassName,
        })}
    </>
  );
};
