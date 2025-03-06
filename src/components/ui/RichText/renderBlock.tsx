import { cn } from "@/lib/utils";
import { MediaBlock } from "@/components/ui/MediaBlock";
import { Kbd, Table, TableData, TableScrollContainer } from "@mantine/core";
import {
  KbdInlineBlockProps,
  SerializeLexical,
} from "@/components/ui/RichText/types";
import type {
  CalloutBlock,
  CodeBlock,
  MediaBlock as MediaBlockProps,
  TableBlock,
} from "@/types/payload";
import { BlockFields, SerializedTextNode } from "@payloadcms/richtext-lexical";
import { Callout } from "@/components/ui/Callout";
import { CodeHighlight } from "@/components/ui/CodeHighlight";

export const isValidNode = (node: unknown): node is SerializedTextNode => {
  if (!node || typeof node !== "object") return false;
  return "type" in node;
};

export const validateBlockChildren = (
  children?: unknown[],
): SerializedTextNode[] => {
  if (!Array.isArray(children)) return [];
  return children.filter(isValidNode);
};

export const renderBlock = ({
  index,
  block,
  className,
  serializeLexical,
}: {
  index: number;
  block?: BlockFields<
    | MediaBlockProps
    | CalloutBlock
    | CodeBlock
    | KbdInlineBlockProps
    | TableBlock
  >;
  className?: string;
  serializeLexical: SerializeLexical;
}) => {
  switch (block?.blockType) {
    case "mediaBlock":
      return (
        <MediaBlock key={index} media={block.media} blockType={block.blockType}>
          {serializeLexical({
            nodes:
              typeof block.media === "object"
                ? validateBlockChildren(block.media.caption?.root.children)
                : [],
            className: cn("!text-sm", className),
          })}
        </MediaBlock>
      );
    case "callout":
      return (
        <Callout key={index} blockName={block.blockName} style={block.style}>
          {serializeLexical({
            nodes: validateBlockChildren(block.content.root.children),
            className: cn("mb-0", className),
          })}
        </Callout>
      );
    case "code":
      return (
        <CodeHighlight
          key={index}
          className="mb-8"
          code={block.code}
          language={"javascript"}
        />
      );
    case "table":
      return (
        <TableScrollContainer
          key={index}
          minWidth={undefined}
          type="native"
          className="mb-8"
        >
          <Table
            data={block.content as TableData}
            highlightOnHover
            withTableBorder
            stickyHeader
          />
        </TableScrollContainer>
      );
    case "kbd":
      return <Kbd key={index}>{block.key}</Kbd>;
    default:
      return null;
  }
};
