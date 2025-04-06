import type { Block } from "payload";

export const search: Block = {
  slug: "search",
  interfaceName: "SearchBlock",
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
    },
  ],
  labels: {
    plural: "Searches",
    singular: "Search",
  },
};
