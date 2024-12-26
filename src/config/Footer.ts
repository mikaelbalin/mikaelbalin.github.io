import type { GlobalConfig, GlobalAfterChangeHook } from "payload";
import { link } from "@/fields/link";
import { revalidateTag } from "next/cache";

export const revalidateFooter: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating footer`);

  revalidateTag("global_footer");

  return doc;
};

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
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
      type: "group",
      name: "navigation",
      fields: [
        {
          name: "title",
          type: "text",
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
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};
