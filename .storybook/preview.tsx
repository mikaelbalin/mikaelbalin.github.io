import { MantineProvider } from "@mantine/core";
import type { Preview } from "@storybook/react";
import React from "react";
import { theme } from "../src/theme";
import "@mantine/core/styles.css";

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
      <MantineProvider theme={theme}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </MantineProvider>
    ),
  ],
};

export default preview;
