import type { Block } from "payload";

export const table: Block = {
  slug: "table",
  interfaceName: "TableBlock",
  fields: [
    {
      name: "content",
      type: "json",
      required: true,
    },
  ],
};
