import { JsonObject } from "payload";
import {
  SerializedAutoLinkNode,
  SerializedBlockNode,
  SerializedHeadingNode,
  SerializedHorizontalRuleNode,
  SerializedLineBreakNode,
  SerializedLinkNode,
  SerializedListItemNode,
  SerializedListNode,
  SerializedParagraphNode,
  SerializedQuoteNode,
  SerializedRelationshipNode,
  SerializedTextNode,
  SerializedUploadNode,
  SerializedTableNode,
  TypedEditorState,
} from "@payloadcms/richtext-lexical";
import type {
  CalloutBlock as CalloutBlockProps,
  MediaBlock as MediaBlockProps,
  TableBlock as TableBlockProps,
  CodeBlock as CodeBlockProps,
} from "@/types/payload";
import { JSX } from "react";

export type KbdInlineBlockProps = {
  key: string;
  id?: string | null;
  blockType: "kbd";
};

export type CustomBlockNode<T extends JsonObject = JsonObject> = Omit<
  SerializedBlockNode<T>,
  "type"
> & {
  type: "inlineBlock" | "block";
};

export type BlockTypes = "mediaBlock" | "callout" | "code" | "table" | "kbd";

type NodeType =
  | SerializedTableNode
  | SerializedAutoLinkNode
  | SerializedHeadingNode
  | SerializedHorizontalRuleNode
  | SerializedLineBreakNode
  | SerializedLinkNode
  | SerializedListItemNode
  | SerializedListNode
  | SerializedParagraphNode
  | SerializedQuoteNode
  | SerializedRelationshipNode
  | SerializedTextNode
  | SerializedUploadNode
  | CustomBlockNode<
      | MediaBlockProps
      | CalloutBlockProps
      | CodeBlockProps
      | KbdInlineBlockProps
      | TableBlockProps
    >;

export type Content = TypedEditorState<NodeType>;

export type ContentChildren = Content["root"]["children"];

type Args = {
  nodes?: ContentChildren;
  className?: string;
};

export type SerializeLexical = ({
  nodes,
  className,
}: Args) => (JSX.Element | null)[] | undefined;
