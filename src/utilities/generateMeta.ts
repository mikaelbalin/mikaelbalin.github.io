import type { Metadata } from "next";
import type { Page, Post } from "@/types/payload";
import { mergeOpenGraph } from "./mergeOpenGraph";
import { getServerSideURL } from "./getURL";

/**
 * Generates metadata for a given document.
 */
export const generateMeta = async (args: {
  /** A partial Page or Post object containing metadata information. */
  doc: Partial<Page> | Partial<Post>;
}): Promise<Metadata> => {
  const { doc } = args || {};

  const ogImage =
    typeof doc?.meta?.image === "object" &&
    doc.meta.image !== null &&
    "url" in doc.meta.image &&
    `${getServerSideURL()}`;

  const title = doc?.meta?.title
    ? doc?.meta?.title + " | Mikael's Blog"
    : "Mikael's Blog";

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || "",
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
    }),
    title,
  };
};
