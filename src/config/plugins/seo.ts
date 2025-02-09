import { Tab } from "payload";
import { seoPlugin } from "@payloadcms/plugin-seo";
import {
  GenerateDescription,
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

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | Payload Website Template`
    : "Payload Website Template";
};

const generateURL: GenerateURL<Post | Page> = ({ doc, collectionSlug }) => {
  const url = getServerSideURL();
  console.log({ url, collectionSlug });

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

const generateDescription: GenerateDescription<Post | Page> = ({ doc }) => {
  return "An open-source website built with Payload and Next.js.";
};

const generateImage: GenerateImage<Post | Page> = async ({
  doc,
  req: { payload },
}) => {
  const url = getServerSideURL();
  const title = doc?.title || "Default Title";

  // Fetch the image from the OG route
  const response = await fetch(
    `${url}/next/og?title=${encodeURIComponent(title)}`,
  );
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Payload media collection
  const media = await payload.create({
    collection: "media",
    data: {
      alt: "OG Image",
    },
    file: {
      data: buffer,
      name: "og-image.png",
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
      hasGenerateFn: true,
    }),
    PreviewField({
      // if the `generateUrl` function is configured
      hasGenerateFn: true,
      // field paths to match the target field for data
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
