import { Tab } from "payload";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
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

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
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
    }),
    MetaDescriptionField({}),
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
});
