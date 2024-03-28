const stylexPlugin = require("@stylexjs/nextjs-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
};

module.exports = stylexPlugin({
  rootDir: __dirname,
})(nextConfig);
