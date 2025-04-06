import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from "@payloadcms/richtext-lexical/lexical";
import { SerializedTextNode } from "@payloadcms/richtext-lexical";
import { Fragment, JSX } from "react";

export const formatMap = {
  [IS_BOLD]: (text: string, key: number) => <strong key={key}>{text}</strong>,
  [IS_ITALIC]: (text: string, key: number) => <em key={key}>{text}</em>,
  [IS_STRIKETHROUGH]: (text: string, key: number) => (
    <span key={key} className="line-through">
      {text}
    </span>
  ),
  [IS_UNDERLINE]: (text: string, key: number) => (
    <span className="underline" key={key}>
      {text}
    </span>
  ),
  [IS_CODE]: (text: string, key: number) => (
    <code
      key={key}
      className="bg-muted border-muted-foreground/30 relative rounded border px-1 py-0.5 font-mono text-[0.7em]"
    >
      {text}
    </code>
  ),
  [IS_SUBSCRIPT]: (text: string, key: number) => <sub key={key}>{text}</sub>,
  [IS_SUPERSCRIPT]: (text: string, key: number) => <sup key={key}>{text}</sup>,
};

export const renderText = (
  index: number,
  node: SerializedTextNode,
): JSX.Element | null => {
  const { text, format } = node;

  const formatter = formatMap[format];
  if (formatter) {
    return formatter(text, index);
  }

  return <Fragment key={index}>{text}</Fragment>;
};
