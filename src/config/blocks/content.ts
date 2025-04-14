import type { Block } from "payload";
import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const content: Block = {
  slug: "content",
  interfaceName: "ContentBlock",
  fields: [
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
            EXPERIMENTAL_TableFeature(),
          ];
        },
      }),
      required: true,
    },
  ],
  labels: {
    plural: "Contents",
    singular: "Content",
  },
};
