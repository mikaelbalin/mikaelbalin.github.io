import type { GlobalAfterChangeHook, GlobalConfig } from "payload";
import { link } from "@/config/link";
import { revalidateTag } from "next/cache";
import { anyone } from "@/lib/access";

const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating header`);

  revalidateTag("global_header");

  return doc;
};

export const header: GlobalConfig = {
  slug: "header",
  access: {
    read: anyone,
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
      localized: true,
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
