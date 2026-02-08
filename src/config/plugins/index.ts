import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import slugify from "@sindresorhus/slugify";
import type { Plugin, TextField } from "payload";
import { formBuilderPluginConfig } from "./form";
import { searchPluginConfig } from "./search";
import { seoPluginConfig } from "./seo";

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ["pages", "posts"],
    overrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if (
            "name" in field &&
            field.name === "from" &&
            field.type === "text"
          ) {
            const nextField: TextField = {
              ...field,
              admin: {
                description:
                  "You will need to rebuild the website when changing this field.",
              },
            };
            return nextField;
          }
          return field;
        });
      },
    },
  }),
  // See https://payloadcms.com/docs/plugins/nested-docs
  nestedDocsPlugin({
    collections: ["categories"],
    generateLabel: (_, currentDoc) =>
      typeof currentDoc.title === "string" ? currentDoc.title : "",
    generateURL: (docs) =>
      docs.reduce(
        (url, doc) =>
          `${url}/${slugify(typeof doc.title === "string" ? doc.title : "")}`,
        "",
      ),
  }),
  seoPluginConfig,
  formBuilderPluginConfig,
  searchPluginConfig,
  vercelBlobStorage({
    enabled: true, // Optional, defaults to true
    // Specify which collections should use Vercel Blob
    collections: {
      media: true,
    },
    // Token provided by Vercel once Blob storage is added to your Vercel project
    token: process.env.BLOB_READ_WRITE_TOKEN,
  }),
];
