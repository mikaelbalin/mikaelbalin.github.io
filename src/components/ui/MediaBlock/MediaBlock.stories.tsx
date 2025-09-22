import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MediaBlock } from "./MediaBlock";

export default {
  component: MediaBlock,
} satisfies Meta<typeof MediaBlock>;

type Story = StoryObj<typeof MediaBlock>;

export const Default: Story = {
  args: {
    media: {
      id: 1,
      alt: "Sunset",
      caption: {
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
                  text: "Caption for testing",
                  type: "text",
                  style: "",
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: null,
              textStyle: "",
              textFormat: 0,
            },
          ],
          direction: null,
        },
      },
      updatedAt: "2025-09-21T11:54:33.269Z",
      createdAt: "2025-09-21T11:54:33.269Z",
      url: "/api/media/file/Photo%20Sept%2012%202025.jpg",
      thumbnailURL: "/api/media/file/Photo%20Sept%2012%202025-300x398.jpg",
      filename: "Photo Sept 12 2025.jpg",
      mimeType: "image/jpeg",
      filesize: 8587712,
      width: 6144,
      height: 8160,
      focalX: 50,
      focalY: 50,
      // sizes:
      //   "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.",
    },
    blockType: "mediaBlock",
    children:
      "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.",
  },
};
