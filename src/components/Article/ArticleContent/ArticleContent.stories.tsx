import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleContent } from "./ArticleContent";

const meta: Meta<typeof ArticleContent> = {
  component: ArticleContent,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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
                text: "Before using Git, it is essential to configure it properly. The most common initial setup includes setting your name and email, which are used to sign commits, defining the default text editor, and adjusting behavior settings such as case sensitivity.",
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
