import { cn } from "@/utilities/cn";
import { MediaBlock } from "@/components/ui/MediaBlock";
import { Kbd, Table, TableData, TableScrollContainer } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import { KbdInlineBlockProps, NodeType, SerializeLexical } from "./types";
import type {
  CalloutBlock,
  CodeBlock,
  MediaBlock as MediaBlockProps,
  TableBlock,
} from "@/types/payload";
import { BlockFields } from "@payloadcms/richtext-lexical";
import { Callout } from "../Callout";

export const blockRenderer = ({
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
                ? (block.media.caption?.root.children as NodeType[])
                : [],
            className: cn("!text-sm", className),
          })}
        </MediaBlock>
      );
    case "callout":
      return (
        <Callout key={index} blockName={block.blockName} style={block.style}>
          {serializeLexical({
            nodes: block.content.root.children as NodeType[],
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
          language={block.language || undefined}
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
