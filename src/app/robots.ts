import { getServerSideURL } from "#lib/getURL";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/og/*"],
      disallow: "/admin/",
    },
    sitemap: `${getServerSideURL()}/sitemap.xml`,
  };
}
