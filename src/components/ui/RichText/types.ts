import type {
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
  SerializedTableCellNode,
  SerializedTableNode,
  SerializedTableRowNode,
  SerializedTextNode,
  SerializedUploadNode,
  TypedEditorState,
} from "@payloadcms/richtext-lexical";
import type { JsonObject } from "payload";
import type { JSX } from "react";
import type {
  CalloutBlock as CalloutBlockProps,
  CodeBlock as CodeBlockProps,
  MediaBlock as MediaBlockProps,
} from "#types/payload";

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
  | SerializedTableRowNode
  | SerializedTableCellNode
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
      MediaBlockProps | CalloutBlockProps | CodeBlockProps | KbdInlineBlockProps
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
