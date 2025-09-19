import { Tab } from "payload";
import { seoPlugin } from "@payloadcms/plugin-seo";
import {
  GenerateTitle,
  GenerateURL,
  GenerateDescription,
  GenerateImage,
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
import { createSeoDescriptionPrompt } from "#lib/aiPrompts";
import {
  SITE_TITLE,
  NO_DESCRIPTION_AVAILABLE,
  SEO_DESCRIPTION_ERROR,
} from "#config/constants";
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
    return NO_DESCRIPTION_AVAILABLE;
  }

  const textContent = extractTextFromPayloadContent(doc.content.root.children);

  if (!textContent) {
    return NO_DESCRIPTION_AVAILABLE;
  }

  try {
    const { text } = await generateText({
      model: defaultModel,
      prompt: createSeoDescriptionPrompt(textContent),
    });

    return text;
  } catch (error) {
    console.error(`${SEO_DESCRIPTION_ERROR}:`, error);

    return SEO_DESCRIPTION_ERROR;
  }
};

const generateImage: GenerateImage<Post | Page> = () => {
  return "";
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
  generateImage,
});
