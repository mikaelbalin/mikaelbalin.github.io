import nextBundleAnalyzer from "@next/bundle-analyzer";
import nextMDX from "@next/mdx";
import { withPayload } from "@payloadcms/next/withPayload";

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  devIndicators: {
    position: "bottom-right",
  },
  experimental: {
    optimizePackageImports: [
      "@mantine/code-highlight",
      "@mantine/core",
      "@mantine/form",
      "@mantine/hooks",
      "@mantine/notifications",
      "@tabler/icons-react",
      "lucide-react",
      "three",
      "motion",
    ],
  },
  serverExternalPackages: [
    "@ai-sdk/google",
    // "@formatjs/intl-localematcher",
    // "@payloadcms/db-postgres",
    // "@payloadcms/db-vercel-postgres",
    // "@payloadcms/email-resend",
    // "@payloadcms/plugin-form-builder",
    // "@payloadcms/plugin-nested-docs",
    // "@payloadcms/plugin-redirects",
    // "@payloadcms/plugin-search",
    // "@payloadcms/plugin-seo",
    // "@payloadcms/storage-vercel-blob",
    // "@react-email/components",
    // "@react-email/render",
    // "@react-three/drei",
    // "@react-three/fiber",
    // "@react-three/rapier",
    // "@upstash/ratelimit",
    // "@vercel/kv",
    // "@vercel/og",
    // "ai",
    // "graphql",
    // "tailwind-merge",
    // "tailwindcss-animate",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
        port: "1337",
        pathname: "/uploads/**/*",
      },
      ...[NEXT_PUBLIC_SERVER_URL, "https://placehold.co"].map((item) => {
        const url = new URL(item);

        return {
          protocol: url.protocol.replace(":", ""),
          hostname: url.hostname,
        };
      }),
    ],
  },
  reactStrictMode: true,
};

const withMDX = nextMDX({
  options: {
    baseUrl: import.meta.url,
  },
});

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withMDX(withPayload(nextConfig)));
