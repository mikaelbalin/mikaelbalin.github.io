import { Tab } from "payload";
import { seoPlugin } from "@payloadcms/plugin-seo";
import {
  GenerateImage,
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
import { Page, Post } from "@/types/payload";
import { getServerSideURL } from "@/utilities/getURL";
import { readFile } from "fs/promises";
import { join } from "path";
import { OGHome } from "@/components/og/OGHome";
import { ImageResponse } from "next/og";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { Content, ContentChildren } from "@/components/ui/RichText/types";

const TITLE = "Mikael's Blog";
const SYSTEM = `You are an SEO meta description writer. Follow these rules strictly:
- Keep descriptions between 100-150 characters
- Make descriptions unique and descriptive
- Use active voice and compelling language
- Include relevant keywords naturally
- Accurately summarize the content
- Do not use quotes or special characters
- Do not stuff keywords
- Do not use generic descriptions`;

const getNodeText = (node: ContentChildren[number]): string => {
  if (!node) {
    return "";
  }

  // Handle text nodes
  if (node.type === "text") {
    return node.text;
  }

  // Recursively process children nodes
  if (
    (node.type === "heading" || node.type === "paragraph") &&
    node.children &&
    node.children.length > 0
  ) {
    return node.children.map(getNodeText).join("");
  }

  return "";
};

export const extractText = (nodes?: ContentChildren): string => {
  if (!nodes) return "";
  return nodes.map(getNodeText).join("");
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
  if ("content" in doc) {
    const prompt = extractText((doc.content as Content).root.children);

    const { text } = await generateText({
      model: google("gemini-2.0-flash-001"),
      system: SYSTEM,
      prompt,
    });

    return text;
  }

  return "";
};

const generateImage: GenerateImage<Post | Page> = async ({
  doc,
  req: { payload },
}) => {
  const title = doc?.title || getServerSideURL();
  const truncatedTitle =
    title.length > 17 ? `${title.slice(0, 17)} ...` : title;

  // Read font file
  const fontPath = join(process.cwd(), "public/fonts/Inter_24pt-Regular.ttf");
  const fontData = await readFile(fontPath);

  // Generate image directly
  const imageResponse = new ImageResponse(<OGHome title={truncatedTitle} />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: fontData,
        style: "normal",
        weight: 400,
      },
    ],
  });

  // Convert response to buffer
  const arrayBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Payload media collection
  const media = await payload.create({
    collection: "media",
    data: {
      alt: title,
    },
    file: {
      data: buffer,
      name: `${title}.png`,
      mimetype: "image/png",
      size: buffer.length,
    },
  });

  return media.id.toString();
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
  generateImage,
  generateDescription,
});
