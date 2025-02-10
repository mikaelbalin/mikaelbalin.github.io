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
  const baseURL = getServerSideURL();
  const title = baseURL || doc?.title;
  const url = new URL("/api/og", baseURL);
  url.searchParams.set("title", title);

  // Fetch the image from the OG route
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
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
      overrides: {
        required: true,
      },
    }),
    MetaDescriptionField({
      hasGenerateFn: false,
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
  // implement `generateDescription`
});
