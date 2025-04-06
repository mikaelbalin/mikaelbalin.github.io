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
};

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withPayload(nextConfig));
