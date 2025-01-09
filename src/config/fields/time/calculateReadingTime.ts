import { FieldHook } from "payload";

/**
 * Assuming average reading speed of 200 words per minute
 */
const WORDS_PER_MINUTE = 200;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculateReadingTime = (content: any): number => {
  let textContent = "";

  // Recursive function to extract text from nodes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractText = (nodes: any[]) => {
    if (!nodes) return;

    nodes.forEach((node) => {
      if (node.type === "text") {
        textContent += " " + node.text;
      }
      // Recursively process child nodes
      if (node.children) {
        extractText(node.children);
      }
      // Handle content in rich text blocks (like callouts)
      if ("fields" in node && node.fields?.content?.root?.children) {
        extractText(node.fields.content.root.children);
      }
    });
  };

  if (content?.root?.children) {
    extractText(content.root.children);
  }

  const words = textContent.trim().split(/\s+/).length;
  return Math.ceil(words / WORDS_PER_MINUTE);
};

export const calculateReadingTimeHook =
  (fieldToUse: string): FieldHook =>
  ({ data, value }) => {
    const readingTime = calculateReadingTime(data?.[fieldToUse]);
    return readingTime || value;
  };
