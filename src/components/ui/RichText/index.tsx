import { ElementType, FC, Fragment } from "react";
import { serializeLexical, type NodeType } from "./serialize";
import { Post } from "@/types/payload";

type RichTextProps = {
  className?: string;
  textClassName?: string;
  content: Post["content"];
  htmlElement?: ElementType;
};

const RichText: FC<RichTextProps> = ({
  className,
  textClassName,
  content,
  htmlElement = "div",
}) => {
  if (!content) {
    return null;
  }

  const Tag = className ? htmlElement : Fragment;

  return (
    <Tag
      {...(typeof Tag === "string"
        ? {
            className,
          }
        : {})}
    >
      {content &&
        !Array.isArray(content) &&
        typeof content === "object" &&
        "root" in content &&
        serializeLexical({
          nodes: content?.root?.children as NodeType[],
          className: textClassName,
        })}
    </Tag>
  );
};

export default RichText;
