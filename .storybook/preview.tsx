import type { Preview } from "@storybook/react";
import React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../src/theme";
import "@mantine/core/styles.css";

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
