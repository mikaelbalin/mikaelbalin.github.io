import {
  KbdInlineBlockProps,
  SerializeLexical,
} from "#components/ui/RichText/types";
import type {
  CalloutBlock,
  ChartBlock,
  CodeBlock,
  MediaBlock as MediaBlockProps,
} from "#types/payload";
import { BlockFields, SerializedTextNode } from "@payloadcms/richtext-lexical";
import { Callout } from "#components/ui/Callout";
import { CodeHighlight } from "#components/ui/CodeHighlight";
import { MediaBlock } from "#components/ui/MediaBlock";
import { BigO } from "#components/ui/Chart/BigO";

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
  serializeLexical,
}: {
  index: number;
  block?: BlockFields<
    | MediaBlockProps
    | CalloutBlock
    | CodeBlock
    | KbdInlineBlockProps
    | ChartBlock
  >;
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
          })}
        </MediaBlock>
      );
    case "callout":
      return (
        <Callout
          key={index}
          blockName={block.blockName}
          style={block.style}
          className="group"
        >
          {serializeLexical({
            nodes: validateBlockChildren(block.content.root.children),
          })}
        </Callout>
      );
    case "code":
      return (
        <CodeHighlight key={index} language={block.language ?? "txt"}>
          {block.code}
        </CodeHighlight>
      );
    case "chart":
      return block.style === "bigO" ? <BigO key={index} /> : null;
    case "kbd":
      return <kbd key={index}>{block.key}</kbd>;
    default:
      return null;
  }
};
