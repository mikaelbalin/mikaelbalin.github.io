import { withPayload } from "@payloadcms/next/withPayload";
import nextBundleAnalyzer from "@next/bundle-analyzer";
import { codecovNextJSWebpackPlugin } from "@codecov/nextjs-webpack-plugin";

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

console.warn({
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL:
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
});

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
  experimental: {
    optimizePackageImports: ["@payloadcms/next", "@payloadcms/ui"],
  },
  poweredByHeader: false,
  webpack: (config, options) => {
    // Only enable Codecov plugin in production environment
    if (process.env.NODE_ENV === "production") {
      config.plugins.push(
        codecovNextJSWebpackPlugin({
          enableBundleAnalysis: true,
          bundleName: "mikaelbalin-website-bundle",
          uploadToken: process.env.CODECOV_TOKEN,
          webpack: options.webpack,
          telemetry: false,
        }),
      );
    }

    return config;
  },
};

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withPayload(nextConfig));
