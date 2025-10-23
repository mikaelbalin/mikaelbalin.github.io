import { JSX } from "react";
import {
  ContentChildren,
  SerializeLexical,
} from "#components/ui/RichText/types";
import { renderText } from "#components/ui/RichText/renderText";
import { renderNode } from "#components/ui/RichText/renderNode";
import { renderBlock } from "#components/ui/RichText/renderBlock";

const getSerializedChildren = (
  node: ContentChildren[number],
  className?: string,
): (JSX.Element | null)[] | undefined => {
  if ("children" in node && Array.isArray(node.children)) {
    return serializeLexical({
      nodes: node.children,
      className,
    });
  }
  return undefined;
};

export const serializeLexical: SerializeLexical = ({ nodes, className }) => {
  return nodes?.map((node, index): JSX.Element | null => {
    if (!node) {
      return null;
    }

    if (node.type === "text") {
      return renderText(index, node);
    }

    if (node.type === "block" || node.type === "inlineBlock") {
      return renderBlock({
        block: node.fields,
        index,
        serializeLexical,
      });
    } else {
      const serializedChildren = getSerializedChildren(node, className);

      return renderNode({
        node,
        index,
        children: serializedChildren,
        className,
      });
    }
  });
};
