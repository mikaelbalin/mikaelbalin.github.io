import type { Block } from "payload";

export const about: Block = {
  slug: "about",
  interfaceName: "AboutBlock",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
      localized: true,
    },
  ],
};
