import type { MetadataRoute } from "next";
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { i18n } from "#i18n-config";
import { getServerSideURL } from "#lib/getURL";

const baseUrl = getServerSideURL();

function generateLanguageAlternates(path: string): Languages<string> {
  return i18n.locales.reduce<Languages<string>>((acc, lang) => {
    // For home page
    if (path === "") {
      return { ...acc, [lang]: `${baseUrl}/${lang}` };
    }
    // For other pages
    return { ...acc, [lang]: `${baseUrl}/${lang}/${path}` };
  }, {});
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayload({ config: configPromise });

    const pages = await payload.find({
      collection: "pages",
      select: {
        slug: true,
        updatedAt: true,
      },
      depth: 0,
      pagination: false,
    });

    const posts = await payload.find({
      collection: "posts",
      select: {
        slug: true,
        updatedAt: true,
      },
      depth: 0,
      pagination: false,
    });

    const routes: MetadataRoute.Sitemap = [];

    pages.docs.forEach(({ slug, updatedAt }) => {
      const path = !slug || slug === "home" ? "" : slug;
      routes.push({
        url: slug === "home" ? baseUrl : `${baseUrl}/${slug}`,
        lastModified: updatedAt,
        alternates: { languages: generateLanguageAlternates(path) },
      });
    });

    posts.docs.forEach(({ slug, updatedAt }) => {
      const path = `posts/${slug}`;
      routes.push({
        url: `${baseUrl}/${path}`,
        lastModified: updatedAt,
        alternates: {
          languages: generateLanguageAlternates(path),
        },
      });
    });
    return routes;
  } catch (error) {
    console.error("Error generating sitemap", error);
    return [];
  }
}
