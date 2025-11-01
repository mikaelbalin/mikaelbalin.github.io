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
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {
      nextConfigPath: import.meta.resolve("../next.config.mjs"),
    },
  },
  staticDirs: ["../public"],
  features: {
    experimentalRSC: true,
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
