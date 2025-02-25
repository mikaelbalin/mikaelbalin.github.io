import type { GlobalConfig } from "payload";
import { link } from "@/config/fields/link";
import { formBlock } from "@/config/blocks/formBlock";
import { anyone } from "@/lib/access";

export const footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: anyone,
  },
  fields: [
    {
      name: "titles",
      type: "json",
    },
    {
      type: "group",
      name: "contacts",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
        },
        {
          name: "email",
          type: "email",
        },
        {
          name: "phone",
          type: "text",
        },
      ],
    },
    {
      type: "group",
      name: "social",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
        },
        {
          name: "socialItems",
          type: "array",
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
    },
    {
      name: "form",
      type: "blocks",
      blocks: [formBlock],
      required: true,
    },
    {
      type: "group",
      name: "navigation",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
        },
        {
          name: "navItems",
          type: "array",
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 6,
        },
        {
          name: "topButton",
          type: "text",
          localized: true,
        },
      ],
    },
  ],
};
