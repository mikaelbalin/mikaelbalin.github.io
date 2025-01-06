import type { Block } from "payload";

export const code: Block = {
  slug: "code",
  interfaceName: "CodeBlock",
  fields: [
    {
      name: "language",
      type: "select",
      defaultValue: "tsx",
      options: [
        {
          label: "Typescript",
          value: "typescript",
        },
        {
          label: "TypeScript React",
          value: "tsx",
        },
        {
          label: "Javascript",
          value: "javascript",
        },
        {
          label: "CSS",
          value: "css",
        },
      ],
    },
    {
      name: "code",
      type: "code",
      label: false,
      required: true,
    },
  ],
};
