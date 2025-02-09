import { getServerSideURL } from "@/utilities/getURL";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/next/og/*"],
      disallow: "/admin/",
    },
    sitemap: `${getServerSideURL()}/sitemap.xml`,
  };
}
