import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { VideoMedia } from "./VideoMedia";

export default {
  component: VideoMedia,
} satisfies Meta<typeof VideoMedia>;

type Story = StoryObj<typeof VideoMedia>;

export const Default: Story = {
  args: {
    resource: {
      id: 2,
      alt: "Alt",
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
                  text: "Caption",
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
      updatedAt: "2025-04-05T14:57:08.507Z",
      createdAt: "2025-04-05T14:57:08.479Z",
      url: "/api/media/file/Photos%20Apr%204%202025.mp4",
      thumbnailURL: null,
      filename: "Photos Apr 4 2025.mp4",
      mimeType: "video/mp4",
      filesize: 16501179,
      width: null,
      height: null,
      focalX: null,
      focalY: null,
      sizes: {
        thumbnail: {
          url: null,
          width: null,
          height: null,
          mimeType: null,
          filesize: null,
          filename: null,
        },
        square: {
          url: null,
          width: null,
          height: null,
          mimeType: null,
          filesize: null,
          filename: null,
        },
        small: {
          url: null,
          width: null,
          height: null,
          mimeType: null,
          filesize: null,
          filename: null,
        },
        medium: {
          url: null,
          width: null,
          height: null,
          mimeType: null,
          filesize: null,
          filename: null,
        },
        large: {
          url: null,
          width: null,
          height: null,
          mimeType: null,
          filesize: null,
          filename: null,
        },
        xlarge: {
          url: null,
          width: null,
          height: null,
          mimeType: null,
          filesize: null,
          filename: null,
        },
      },
    },
  },
};
