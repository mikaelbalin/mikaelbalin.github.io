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
      name: "navItems",
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};
