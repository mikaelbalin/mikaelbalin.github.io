import type { Metadata } from "next";
import type { Page, Post } from "#types/payload";
import { getServerSideURL } from "./getURL";

/**
 * Generates metadata for a given document.
 */
export const generateMeta = async (args: {
  /** A partial Page or Post object containing metadata information. */
  doc: Partial<Page> | Partial<Post>;
  lang: string;
}): Promise<Metadata> => {
  const { doc, lang } = args || {};

  if (!doc?.meta) return {};

  const title = doc.meta.title;

  const ogImage =
    typeof doc.meta.image === "object" &&
    doc.meta.image !== null &&
    "url" in doc.meta.image &&
    `${getServerSideURL()}/media/${doc.meta.image.id}`;

  return {
    title,
    description: doc.meta.description,
    openGraph: {
      type: "website",
      title: title,
      description: doc.meta.description,
      url: doc.slug
        ? `${getServerSideURL()}/${lang}/${doc.slug}`
        : `${getServerSideURL()}/${lang}`,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      siteName: "Mikael Balin",
    },
  };
};
