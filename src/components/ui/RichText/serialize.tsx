import { JSX } from "react";
import "@mantine/code-highlight/styles.css";
import { NodeType, SerializeLexical } from "./types";
import { formatTextNode } from "./formatters";
import { nodeRenderer } from "./nodeRenderers";
import { blockRenderer } from "./blockRenderers";

export const serializeLexical: SerializeLexical = ({ nodes, className }) => {
  return nodes?.map((node, index): JSX.Element | null => {
    if (!node) {
      return null;
    }

    if (node.type === "text") {
      return formatTextNode(index, node);
    }

    if (node.type === "block" || node.type === "inlineBlock") {
      return blockRenderer({
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

      return nodeRenderer({
        node,
        index,
        children: serializedChildren,
        className,
      });
    }
  });
};
