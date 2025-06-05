import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
    enableCrashReports: false,
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-themes",
    "@storybook/addon-vitest",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  docs: {
    autodocs: "tag",
  },
  features: {
    experimentalRSC: true,
    viewportStoryGlobals: true,
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;
