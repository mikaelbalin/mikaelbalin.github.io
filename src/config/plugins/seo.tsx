import { Tab } from "payload";
import { seoPlugin } from "@payloadcms/plugin-seo";
import {
  GenerateTitle,
  GenerateURL,
  GenerateDescription,
} from "@payloadcms/plugin-seo/types";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import { Page, Post } from "#types/payload";
import { getServerSideURL } from "#lib/getURL";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const TITLE = "Mikael Balin";

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | ${TITLE}` : TITLE;
};

const generateURL: GenerateURL<Post | Page> = ({ doc, collectionSlug }) => {
  const url = getServerSideURL();
  const slug = doc?.slug;

  return slug && slug !== "home" ? `${url}/${collectionSlug}/${slug}` : url;
};

const generateDescription: GenerateDescription<Post | Page> = async ({
  doc,
}) => {
  if (!("content" in doc)) return "No description available.";

  console.log({ doc: doc.content.root });

  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: ``,
  });

  return text;
};

export const meta: Tab = {
  name: "meta",
  label: "SEO",
  fields: [
    OverviewField({
      titlePath: "meta.title",
      descriptionPath: "meta.description",
      imagePath: "meta.image",
    }),
    MetaTitleField({
      hasGenerateFn: true,
      overrides: {
        required: true,
      },
    }),
    MetaImageField({
      relationTo: "media",
      hasGenerateFn: true,
    }),
    MetaDescriptionField({
      hasGenerateFn: true,
      overrides: {
        required: true,
      },
    }),
    PreviewField({
      hasGenerateFn: true,
      titlePath: "meta.title",
      descriptionPath: "meta.description",
    }),
  ],
  localized: true,
};

export const seoPluginConfig = seoPlugin({
  generateTitle,
  generateURL,
  generateDescription,
});
