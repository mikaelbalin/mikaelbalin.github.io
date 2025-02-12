import { Tab } from "payload";
import { seoPlugin } from "@payloadcms/plugin-seo";
import {
  GenerateImage,
  GenerateTitle,
  GenerateURL,
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
import { HomeOG } from "@/components/og/HomeOG";
import { ImageResponse } from "next/og";

const TITLE = "Mikael's Blog";

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | ${TITLE}` : TITLE;
};

const generateURL: GenerateURL<Post | Page> = ({ doc, collectionSlug }) => {
  const url = getServerSideURL();
  const slug = doc?.slug;

  return slug && slug !== "home" ? `${url}/${collectionSlug}/${slug}` : url;
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
  const imageResponse = await new ImageResponse(
    <HomeOG title={truncatedTitle} />,
    {
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
    },
  );

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
    }),
    MetaImageField({
      relationTo: "media",
      hasGenerateFn: true,
    }),
    MetaDescriptionField({
      hasGenerateFn: false,
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
  // implement `generateDescription`
});
