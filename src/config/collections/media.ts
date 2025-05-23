import type { CollectionConfig } from "payload";
import {
  FixedToolbarFeature,
  BoldFeature,
  lexicalEditor,
  ParagraphFeature,
  ItalicFeature,
  LinkFeature,
} from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";
import { anyone, authenticated } from "#lib/access";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "richText",
      editor: lexicalEditor({
        features: () => {
          return [
            FixedToolbarFeature(),
            BoldFeature(),
            ItalicFeature(),
            ParagraphFeature(),
            LinkFeature(),
          ];
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, "../../../public/media"),
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
      },
      {
        name: "square",
        width: 500,
        height: 500,
      },
      {
        name: "small",
        width: 600,
      },
      {
        name: "medium",
        width: 900,
      },
      {
        name: "large",
        width: 1400,
      },
      {
        name: "xlarge",
        width: 1920,
      },
    ],
  },
};
