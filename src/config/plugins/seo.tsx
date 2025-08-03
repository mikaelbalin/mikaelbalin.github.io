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

type PayloadNode = {
  type: string;
  version?: number;
  text?: string;
  children?: PayloadNode[];
  [k: string]: unknown;
};

const extractTextFromPayloadContent = (nodes: PayloadNode[]): string => {
  if (!nodes || !Array.isArray(nodes)) return "";

  return nodes
    .map((node) => {
      if (!node || typeof node !== "object") return "";

      if (node.type === "text" && typeof node.text === "string") {
        return node.text;
      }

      if (node.type === "block" || node.type === "inlineBlock") {
        // Skip block content for meta description
        return "";
      }

      if (Array.isArray(node.children)) {
        return extractTextFromPayloadContent(node.children);
      }

      return "";
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
};

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
  if (!("content" in doc) || !doc.content?.root?.children) {
    return "No description available.";
  }

  const textContent = extractTextFromPayloadContent(doc.content.root.children);

  if (!textContent) {
    return "No description available.";
  }

  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: `Create a concise SEO meta description (max 150 characters) for the following content. Focus on the main topic and key points:

  ${textContent}

  The description should be engaging and informative for search engine users.`,
    maxOutputTokens: 150,
  });

  console.log({ textContent, text });

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
