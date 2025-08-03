type PayloadNode = {
  type: string;
  version?: number;
  text?: string;
  children?: PayloadNode[];
  [k: string]: unknown;
};

/**
 * Extracts plain text content from Payload CMS rich text structure.
 * Recursively traverses the node tree and concatenates text content.
 *
 * @param nodes - Array of Payload content nodes
 * @returns Extracted and cleaned text content
 */
export const extractTextFromPayloadContent = (nodes: PayloadNode[]): string => {
  if (!nodes || !Array.isArray(nodes)) return "";

  const extractText = (node: PayloadNode): string => {
    if (!node || typeof node !== "object") return "";

    if (node.type === "text" && typeof node.text === "string") {
      return node.text;
    }

    // Skip blocks but include some text from specific block types
    if (node.type === "block" || node.type === "inlineBlock") {
      return "";
    }

    // Handle different node types
    if (node.type === "paragraph" || node.type === "heading") {
      if (Array.isArray(node.children)) {
        return node.children.map(extractText).join(" ");
      }
    }

    if (Array.isArray(node.children)) {
      return node.children.map(extractText).join(" ");
    }

    return "";
  };

  const text = nodes
    .map(extractText)
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return text;
};
