import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { searchPlugin } from "@payloadcms/plugin-search";
import { Plugin, TextField } from "payload";
import { revalidateRedirects } from "@/config/hooks/revalidateRedirects";
import { searchFields } from "@/config/fields/searchFields";
import slugify from "@sindresorhus/slugify";
import { BeforeSync, DocToSync } from "@payloadcms/plugin-search/types";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { formBuilderPluginConfig } from "./form";
import { seoPluginConfig } from "./seo";

const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc;

  const { slug, id, categories, title, meta } = originalDoc;

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image?.id || meta?.image,
      description: meta?.description,
    },
    categories: [],
  };

  if (categories && Array.isArray(categories) && categories.length > 0) {
    // get full categories and keep a flattened copy of their most important properties
    try {
      const mappedCategories = categories.map((category) => {
        const { id, title } = category;

        return {
          relationTo: "categories",
          id,
          title,
        };
      });

      modifiedDoc.categories = mappedCategories;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error(
        `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
      );
    }
  }

  return modifiedDoc;
};

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
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  // See https://payloadcms.com/docs/plugins/nested-docs
  nestedDocsPlugin({
    collections: ["categories"],
    generateLabel: (docs, currentDoc) =>
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
  searchPlugin({
    collections: ["posts"],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields];
      },
    },
  }),
  vercelBlobStorage({
    enabled: process.env.NODE_ENV !== "development", // Optional, defaults to true
    // Specify which collections should use Vercel Blob
    collections: {
      media: true,
    },
    // Token provided by Vercel once Blob storage is added to your Vercel project
    token: process.env.BLOB_READ_WRITE_TOKEN,
  }),
];
