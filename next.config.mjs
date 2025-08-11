import { withPayload } from "@payloadcms/next/withPayload";
import nextBundleAnalyzer from "@next/bundle-analyzer";

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item);

        return {
          protocol: url.protocol.replace(":", ""),
          hostname: url.hostname,
        };
      }),
    ],
  },
  reactStrictMode: true,
  devIndicators: {
    position: "bottom-right",
  },
  // Optimizations for cold start performance
  experimental: {
    // Use webpack cache for faster builds
    webpackBuildWorker: true,
    // Optimize memory usage
    optimizePackageImports: ["@payloadcms/next", "@payloadcms/ui"],
  },
  // Reduce bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Configure runtime optimizations
  poweredByHeader: false,
  // Add headers for better caching
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=600",
          },
        ],
      },
    ];
  },
};

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withPayload(nextConfig));
