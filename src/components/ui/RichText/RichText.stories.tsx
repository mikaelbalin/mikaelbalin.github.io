import type { Meta, StoryObj } from "@storybook/react";
import { RichText } from "./RichText";

const meta = {
  component: RichText,
} satisfies Meta<typeof RichText>;

export default meta;
type Story = StoryObj<typeof RichText>;

export const Default: Story = {
  args: {
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "Welcome to Storybook's documentation. Learn how to get started with Storybook in your project. Then, explore Storybook's ",
                type: "text",
                style: "",
                detail: 0,
                format: 0,
                version: 1,
              },
              {
                mode: "normal",
                text: "main concepts",
                type: "text",
                style: "",
                detail: 0,
                format: 2,
                version: 1,
              },
              {
                mode: "normal",
                text: " and ",
                type: "text",
                style: "",
                detail: 0,
                format: 0,
                version: 1,
              },
              {
                mode: "normal",
                text: "discover",
                type: "text",
                style: "",
                detail: 0,
                format: 8,
                version: 1,
              },
              {
                mode: "normal",
                text: " ",
                type: "text",
                style: "",
                detail: 0,
                format: 0,
                version: 1,
              },
              {
                mode: "normal",
                text: "additional",
                type: "text",
                style: "",
                detail: 0,
                format: 4,
                version: 1,
              },
              {
                mode: "normal",
                text: " resources to help you grow and maintain your Storybook.",
                type: "text",
                style: "",
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: "ltr",
            textStyle: "",
            textFormat: 0,
          },
        ],
        direction: "ltr",
      },
    },
  },
};
