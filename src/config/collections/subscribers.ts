import { CollectionConfig } from "payload";
import { authenticated } from "@/lib/access";

export const subscribers: CollectionConfig = {
  slug: "subscribers",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "subscribed",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "token",
      type: "text",
      required: true,
      unique: true,
      hidden: true,
    },
  ],
};
