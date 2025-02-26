import type { GlobalConfig } from "payload";
import { link } from "@/config/fields/link";
import { anyone } from "@/lib/access";

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
    },
  ],
};
