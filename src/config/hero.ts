import type { Condition, Field } from "payload";
import { link } from "@/config/link";

const condition: Condition = (data) => data.hero.type === "main";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "lowImpact",
      label: "Type",
      options: [
        {
          label: "Main",
          value: "main",
        },
        {
          label: "Blog",
          value: "blog",
        },
      ],
      required: true,
    },
    {
      name: "titles",
      type: "json",
      admin: {
        condition,
      },
    },
    {
      name: "title",
      type: "text",
      admin: {
        condition: (data) => data.hero.type === "blog",
      },
    },
    {
      name: "description",
      type: "text",
      admin: {
        condition,
      },
    },
    {
      name: "location",
      type: "text",
      required: true,
      admin: {
        condition,
      },
    },
    {
      name: "contactLink",
      type: "group",
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        condition,
      },
    },
  ],
  label: false,
};
