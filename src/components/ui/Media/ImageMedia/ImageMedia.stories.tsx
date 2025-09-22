import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImageMedia } from "./ImageMedia";

export default {
  component: ImageMedia,
} satisfies Meta<typeof ImageMedia>;

type Story = StoryObj<typeof ImageMedia>;

export const Default: Story = {
  args: {
    resource: {
      alt: "Sunset",
      caption: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "Caption for testing",
                  type: "text",
                  version: 1,
                },
              ],
              direction: null,
              format: "",
              indent: 0,
              textFormat: 0,
              textStyle: "",
              type: "paragraph",
              version: 1,
            },
          ],
          direction: null,
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      },
      createdAt: "2025-09-21T11:54:33.269Z",
      filename: "Photo Sept 12 2025.jpg",
      filesize: 8587712,
      focalX: 50,
      focalY: 50,
      height: 8160,
      id: 1,
      mimeType: "image/jpeg",
      thumbnailURL: "/api/media/file/Photo%20Sept%2012%202025-300x398.jpg",
      updatedAt: "2025-09-21T11:54:33.269Z",
      url: "/api/media/file/Photo%20Sept%2012%202025.jpg",
      width: 6144,
    },
  },
};
