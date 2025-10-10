import { Block } from "payload";

export const reusableBlock: Block = {
  slug: "reusableBlock",
  interfaceName: "ReusableBlockType",
  fields: [
    {
      name: "block",
      type: "relationship",
      relationTo: "reusableBlocks",
      required: true,
    },
  ],
};
