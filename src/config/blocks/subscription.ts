import type { Block } from "payload";

export const subscription: Block = {
  slug: "subscription",
  interfaceName: "Subscription",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "text",
      type: "text",
      required: true,
    },
  ],
  labels: {
    plural: "Subscriptions",
    singular: "Subscription",
  },
};
