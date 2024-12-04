import nextBundleAnalyzer from "@next/bundle-analyzer";
import nextMDX from "@next/mdx";
import { withPayload } from "@payloadcms/next/withPayload";

const withMDX = nextMDX({
  options: {
    baseUrl: import.meta.url,
  },
});

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // output: "export",
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
        port: "1337",
        pathname: "/uploads/**/*",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default withBundleAnalyzer(withMDX(withPayload(nextConfig)));
