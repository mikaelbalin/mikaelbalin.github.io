import React from "react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
import type { Preview } from "@storybook/nextjs-vite";
import { Inter } from "next/font/google";
import "../src/app/(frontend)/[lang]/globals.css";
import "./story.css";
import { ThemeProvider } from "../src/components/theme-provider";
import { Toaster } from "../src/components/ui/Toaster";
import { initialize, mswLoader } from "msw-storybook-addon";

initialize({
  quiet: true,
  onUnhandledRequest: "bypass",
});

const inter = Inter({ subsets: ["latin"] });

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        // 👇 Default values
        { name: "Dark", value: "var(--color-deep-obsidian)" },
        { name: "Light", value: "var(--color-soft-ivory)" },
        // 👇 Add your own
        { name: "White", value: "white" },
      ],
      // 👇 Specify which background is shown by default
      default: "Light",
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    nextjs: {
      // 👇 As in the Next.js application, next/navigation only works using App Router
      appDirectory: true,
    },
  },
  loaders: [mswLoader],
  decorators: [
    // https://github.com/storybookjs/storybook/blob/next/code/addons/themes/docs/api.md#writing-a-custom-decorator
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
    (Story) => (
      <div className={inter.className}>
        <ThemeProvider>
          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
          <Story />
          <Toaster />
        </ThemeProvider>
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default preview;
