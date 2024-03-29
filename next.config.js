const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
