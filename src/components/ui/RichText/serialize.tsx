import { JSX } from "react";
import "@mantine/code-highlight/styles.css";
import { NodeType, SerializeLexical } from "./types";
import { renderText } from "./renderText";
import { renderNode } from "./renderNode";
import { renderBlock } from "./renderBlock";

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
        className,
        serializeLexical,
      });
    } else {
      const serializedChildren =
        "children" in node
          ? node.children == null
            ? undefined
            : serializeLexical({
                nodes: node.children as NodeType[],
                className,
              })
          : undefined;

      return renderNode({
        node,
        index,
        children: serializedChildren,
        className,
      });
    }
  });
};
