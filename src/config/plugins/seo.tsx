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
import { extractTextFromPayloadContent } from "#lib/payloadContentExtractor";
import { defaultModel } from "#lib/aiProvider";
import { SITE_TITLE } from "#config/constants";
import { generateText } from "ai";

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | ${SITE_TITLE}` : SITE_TITLE;
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
      model: defaultModel,
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
