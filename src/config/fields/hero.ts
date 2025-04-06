import type { Condition, Field } from "payload";
import { link } from "#config/fields/link";

const condition: Condition = (data) => data.hero.type === "main";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
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
      localized: true,
    },
    {
      name: "description",
      type: "text",
      admin: {
        condition,
      },
      localized: true,
    },
    {
      name: "location",
      type: "text",
      required: true,
      admin: {
        condition,
      },
      localized: true,
    },
    {
      name: "contactLink",
      type: "group",
      fields: [link()],
      admin: {
        condition,
      },
    },
  ],
  label: false,
};
