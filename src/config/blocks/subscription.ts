import type { Block } from "payload";
import { formBlock } from "#config/blocks/formBlock";

export const subscription: Block = {
  slug: "subscription",
  interfaceName: "Subscription",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "text",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "form",
      type: "blocks",
      blocks: [formBlock],
      required: true,
    },
  ],
  labels: {
    plural: "Subscriptions",
    singular: "Subscription",
  },
};
