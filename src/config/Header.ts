import type { GlobalAfterChangeHook, GlobalConfig } from "payload";
import { link } from "@/fields/link";
import { revalidateTag } from "next/cache";

const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating header`);

  revalidateTag("global_header");

  return doc;
};

export const header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "logo",
      type: "group",
      fields: [
        link({
          appearances: false,
        }),
      ],
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
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
