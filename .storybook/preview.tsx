import React from "react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { Preview } from "@storybook/react";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import "../src/app/(frontend)/[lang]/global.css";
import { ThemeProvider } from "../src/theme";

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
        { name: "Dark", value: "var(--mantine-color-black)" },
        { name: "Light", value: "var(--mantine-color-white)" },
        // 👇 Add your own
        { name: "White", value: "white" },
      ],
      // 👇 Specify which background is shown by default
      default: "Light",
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  decorators: [
    // https://github.com/storybookjs/storybook/blob/next/code/addons/themes/docs/api.md#writing-a-custom-decorator
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-mantine-color-scheme",
    }),
    (Story) => (
      <div className={inter.className}>
        <ThemeProvider>
          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
          <Story />
        </ThemeProvider>
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default preview;
