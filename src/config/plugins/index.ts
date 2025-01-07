// import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { searchPlugin } from "@payloadcms/plugin-search";
import { Field, Plugin } from "payload";
import { revalidateRedirects } from "@/config/hooks/revalidateRedirects";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { searchFields } from "@/search/fieldOverrides";
import { beforeSyncWithSearch } from "@/search/beforeSync";
import { Page, Post } from "@/payload-types";
import { getServerSideURL } from "@/utilities/getURL";
import slugify from "@sindresorhus/slugify";

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | Payload Website Template`
    : "Payload Website Template";
};

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
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
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),
                  ];
                },
              }),
            };
          }
          return field;
        });
      },
    },
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
  //   payloadCloudPlugin(),
];
