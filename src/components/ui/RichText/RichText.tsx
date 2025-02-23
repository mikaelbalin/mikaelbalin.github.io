import { FC } from "react";
import { serializeLexical } from "@/components/ui/RichText/serialize";
import { Content } from "@/components/ui/RichText/types";

type RichTextProps = {
  className?: string;
  textClassName?: string;
  content: Content;
};

export const RichText: FC<RichTextProps> = ({
  className,
  textClassName,
  content,
}) => {
  if (!content) {
    return null;
  }

  return (
    <div className={className}>
      {content &&
        !Array.isArray(content) &&
        typeof content === "object" &&
        "root" in content &&
        serializeLexical({
          nodes: content.root.children,
          className: textClassName,
        })}
    </div>
  );
};
