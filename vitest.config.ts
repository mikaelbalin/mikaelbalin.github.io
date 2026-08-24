import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { storybookNextJsPlugin } from "@storybook/nextjs-vite/vite-plugin";
import { playwright } from "@vitest/browser-playwright";
import {
  coverageConfigDefaults,
  defineConfig,
  defineProject,
} from "vitest/config";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// On Fedora/Bazzite, Playwright's bundled Chromium is an Ubuntu build that
// can't run (it's linked against Ubuntu-specific libraries). Detect a
// system-installed Chromium and use it instead; fall back to the bundled
// browser elsewhere (e.g. CI on Ubuntu).
const systemChromiumPath = [
  "/usr/bin/chromium-browser",
].find((candidate) => existsSync(candidate));

const chromiumLaunchOptions = systemChromiumPath
  ? { executablePath: systemChromiumPath }
  : {};

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
  resolve: {
    alias: {
      "#components": path.resolve(dirname, "src/components"),
      "#lib": path.resolve(dirname, "src/lib"),
      "#types": path.resolve(dirname, "src/types"),
      "#config": path.resolve(dirname, "src/config"),
      "#i18n-config": path.resolve(dirname, "src/i18n-config.ts"),
      "@payload-config": path.resolve(dirname, "src/payload.config.ts"),
    },
  },
  test: {
    globals: true,
    includeTaskLocation: true,
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: ["html", "lcov", "text", "json"],
      include: ["src"],
      exclude: [
        "**/*.stories.*",
        "**/*.story.*",
        ...coverageConfigDefaults.exclude,
      ],
    },
    projects: [
      defineProject({
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
          storybookTest({
            // The location of your Storybook config, main.js|ts
            configDir: path.join(dirname, ".storybook"),
            // This should match your package.json script to run Storybook
            // The --ci flag will skip prompts and not open a browser
            storybookScript: "pnpm storybook --ci",
            storybookUrl: "http://localhost:6006",
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({ launchOptions: chromiumLaunchOptions }),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
          exclude: ["node_modules", "dist", ".next"],
        },
      }),
      // Workspace for unit tests (non-Storybook) using Playwright browser
      defineProject({
        // check https://github.com/storybookjs/storybook/pull/32014
        plugins: [storybookNextJsPlugin()],
        test: {
          name: "unit",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({ launchOptions: chromiumLaunchOptions }),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          include: ["src/**/*.test.{js,jsx,ts,tsx}"],
          exclude: ["src/**/*.stories.{js,jsx,ts,tsx}"],
          setupFiles: ["tests/vitest.setup.ts"],
        },
      }),
    ],
  },
});
