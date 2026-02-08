import {
  BoldFeature,
  FixedToolbarFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const callout: Block = {
  slug: "callout",
  fields: [
    {
      name: "style",
      type: "select",
      defaultValue: "note",
      options: [
        { label: "Note", value: "note" },
        { label: "Tip", value: "tip" },
        { label: "Important", value: "important" },
      ],
      required: true,
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: () => {
          return [
            ParagraphFeature(),
            BoldFeature(),
            ItalicFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            InlineCodeFeature(),
          ];
        },
      }),
      label: false,
      required: true,
    },
  ],
  interfaceName: "CalloutBlock",
};
