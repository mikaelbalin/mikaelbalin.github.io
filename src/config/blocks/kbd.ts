import type { Block } from "payload";

export const kbd: Block = {
  slug: "kbd",
  labels: {
    singular: "Keyboard Input",
    plural: "Keyboard Inputs",
  },
  fields: [
    {
      name: "key",
      type: "text",
      required: true,
    },
  ],
};
