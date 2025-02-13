import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/lib/access";

export const categories: CollectionConfig = {
  slug: "categories",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "relatedPosts",
      type: "join",
      collection: "posts",
      on: "categories",
    },
  ],
};
