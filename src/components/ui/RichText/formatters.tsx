import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from "@payloadcms/richtext-lexical/lexical";
import { Text, Code } from "@mantine/core";
import { SerializedTextNode } from "@payloadcms/richtext-lexical";
import { Fragment, JSX } from "react";

export const formatMap = {
  [IS_BOLD]: (text: string, key: number) => (
    <Text key={key} component="strong" fw={700}>
      {text}
    </Text>
  ),
  [IS_ITALIC]: (text: string, key: number) => (
    <Text key={key} component="em" fs="italic">
      {text}
    </Text>
  ),
  [IS_STRIKETHROUGH]: (text: string, key: number) => (
    <Text key={key} component="span" td="line-through">
      {text}
    </Text>
  ),
  [IS_UNDERLINE]: (text: string, key: number) => (
    <Text key={key} component="span" td="underline">
      {text}
    </Text>
  ),
  [IS_CODE]: (text: string, key: number) => <Code key={key}>{text}</Code>,
  [IS_SUBSCRIPT]: (text: string, key: number) => <sub key={key}>{text}</sub>,
  [IS_SUPERSCRIPT]: (text: string, key: number) => <sup key={key}>{text}</sup>,
};

export const formatTextNode = (
  index: number,
  node: SerializedTextNode,
): JSX.Element => {
  const { text, format } = node;

  const formatter = formatMap[format];
  if (formatter) {
    return formatter(text, index);
  }

  return <Fragment key={index}>{text}</Fragment>;
};
