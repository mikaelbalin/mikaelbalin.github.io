import { CollectionConfig } from "payload";
import { subscription } from "../blocks/subscription";
import { authenticated, anyone } from "@/lib/access";

export const reusableBlocks: CollectionConfig = {
  slug: "reusableBlocks",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "blockType",
      type: "blocks",
      blocks: [subscription],
      maxRows: 1, // Ensure only one block can be added
      required: true,
    },
  ],
};
