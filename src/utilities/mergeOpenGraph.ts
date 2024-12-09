import type { Metadata } from "next";
import { getServerSideURL } from "./getURL";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description: "An open-source website built with Payload and Next.js.",
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: "Payload Website Template",
  title: "Payload Website Template",
};

/**
 * Merges the provided Open Graph metadata with the default Open Graph metadata.
 *
 * @param og - The Open Graph metadata to merge. If not provided, the default Open Graph metadata will be used.
 * @returns The merged Open Graph metadata.
 */
export const mergeOpenGraph = (
  og?: Metadata["openGraph"],
): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
