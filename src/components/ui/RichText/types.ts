import { JsonObject } from "payload";
import {
  DefaultNodeTypes,
  SerializedBlockNode,
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

export type NodeType =
  | DefaultNodeTypes
  | CustomBlockNode<
      | MediaBlockProps
      | CalloutBlockProps
      | CodeBlockProps
      | KbdInlineBlockProps
      | TableBlockProps
    >;

type Args = {
  nodes?: NodeType[];
  className?: string;
};

export type SerializeLexical = ({
  nodes,
  className,
}: Args) => (JSX.Element | null)[] | undefined;
