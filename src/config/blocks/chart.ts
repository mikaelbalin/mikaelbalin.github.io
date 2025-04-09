import { Block } from "payload";

export const chart: Block = {
  slug: "chart",
  fields: [
    {
      name: "style",
      type: "select",
      options: [{ label: "Big O", value: "bigO" }],
      required: true,
    },
  ],
  interfaceName: "ChartBlock",
};
