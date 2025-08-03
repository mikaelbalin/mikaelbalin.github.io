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

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const TITLE = "Mikael Balin";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const model = google("gemini-2.5-flash");

type PayloadNode = {
  type: string;
  version?: number;
  text?: string;
  children?: PayloadNode[];
  [k: string]: unknown;
};

const extractTextFromPayloadContent = (nodes: PayloadNode[]): string => {
  if (!nodes || !Array.isArray(nodes)) return "";

  const extractText = (node: PayloadNode): string => {
    if (!node || typeof node !== "object") return "";

    if (node.type === "text" && typeof node.text === "string") {
      return node.text;
    }

    // Skip blocks but include some text from specific block types
    if (node.type === "block" || node.type === "inlineBlock") {
      return "";
    }

    // Handle different node types
    if (node.type === "paragraph" || node.type === "heading") {
      if (Array.isArray(node.children)) {
        return node.children.map(extractText).join(" ");
      }
    }

    if (Array.isArray(node.children)) {
      return node.children.map(extractText).join(" ");
    }

    return "";
  };

  const text = nodes
    .map(extractText)
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return text;
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

  try {
    const { text } = await generateText({
      model,
      prompt: `Create a compelling SEO meta description (100-150 characters) for the following article content. The description should:
- Summarize the main topic and key points
- Be engaging for search engine users
- Include relevant keywords naturally
- Stay within 100-150 characters

Article content:
${textContent.slice(0, 2000)}`,
    });

    return text;
  } catch (error) {
    console.error("Error generating SEO description:", error);

    return "Error generating SEO description";
  }
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
