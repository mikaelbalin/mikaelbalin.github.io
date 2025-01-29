import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { searchPlugin } from "@payloadcms/plugin-search";
import { CollectionAfterErrorHook, Field, Plugin } from "payload";
import { revalidateRedirects } from "@/config/hooks/revalidateRedirects";
import { beforeEmail } from "@/config/hooks/beforeEmail";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { searchFields } from "@/config/fields/searchFields";
import { Page, Post } from "@/types/payload";
import { getServerSideURL } from "@/utilities/getURL";
import slugify from "@sindresorhus/slugify";
import { BeforeSync, DocToSync } from "@payloadcms/plugin-search/types";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | Payload Website Template`
    : "Payload Website Template";
};

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

const beforeSyncWithSearch: BeforeSync = async ({
  originalDoc,
  searchDoc,
  // payload,
}) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc;

  const {
    slug,
    id,
    categories,
    title,
    meta,
    // excerpt
  } = originalDoc;

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

const afterErrorHook: CollectionAfterErrorHook = async ({
  error,
  result,
  graphqlResult,
}) => {
  if ("code" in error && error.code === "SQLITE_CONSTRAINT_UNIQUE") {
    return {
      status: 400,
      response: {
        errors: ["The email address is already subscribed."],
      },
    };
  }

  return {
    status: 500,
    graphqlResult: graphqlResult,
    response: result,
  };
};

/**
 * An array of plugins used in the application.
 *
 * @type {Plugin[]}
 *
 * @property {Plugin} redirectsPlugin - Handles redirects for specified collections with custom field descriptions and hooks.
 * @property {Plugin} nestedDocsPlugin - Manages nested documents for specified collections with custom label and URL generation.
 * @property {Plugin} seoPlugin - Generates SEO-related data such as titles and URLs.
 * @property {Plugin} formBuilderPlugin - Customizes form fields and overrides with additional editor features.
 * @property {Plugin} searchPlugin - Integrates search functionality for specified collections with custom fields and pre-sync actions.
 */
export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ["pages", "posts"],
    overrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ("name" in field && field.name === "from") {
            const nextField: Field = {
              ...field,
              admin: {
                // @ts-expect-error - This is a custom field
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
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ("name" in field && field.name === "confirmationMessage") {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [...rootFeatures, FixedToolbarFeature()];
                },
              }),
            };
          }

          if ("name" in field && field.name === "emails") {
            // console.log("formOverrides", field);
          }

          return field;
        });
      },
    },
    formSubmissionOverrides: {
      hooks: {
        afterError: [afterErrorHook],
      },
    },
    beforeEmail,
  }),
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
