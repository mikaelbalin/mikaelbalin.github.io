import "@mantine/core/styles.css";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
import { Inter } from "next/font/google";
import React from "react";
import "../src/app/[lang]/global.css";
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
  },
  decorators: [
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
};

export default preview;
