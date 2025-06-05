import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImageMedia } from "./ImageMedia";

export default {
  component: ImageMedia,
} satisfies Meta<typeof ImageMedia>;

type Story = StoryObj<typeof ImageMedia>;

export const Default: Story = {
  args: {
    resource: {
      id: 1,
      alt: "Photo by Huy Phan on Unsplash",
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
                  text: "Photo by ",
                  type: "text",
                  style: "",
                  detail: 0,
                  format: 0,
                  version: 1,
                },
                {
                  id: "67f11a409d3fd733e38f255e",
                  type: "link",
                  fields: {
                    url: "https://unsplash.com/@huyphan2602?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                    newTab: false,
                    linkType: "custom",
                  },
                  format: "",
                  indent: 0,
                  version: 3,
                  children: [
                    {
                      mode: "normal",
                      text: "Huy Phan",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                },
                {
                  mode: "normal",
                  text: " on ",
                  type: "text",
                  style: "",
                  detail: 0,
                  format: 0,
                  version: 1,
                },
                {
                  id: "67f11a409d3fd733e38f255f",
                  type: "link",
                  fields: {
                    url: "https://unsplash.com/photos/a-person-is-working-at-a-bright-home-office-glw2Yfc_dIU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                    newTab: false,
                    linkType: "custom",
                  },
                  format: "",
                  indent: 0,
                  version: 3,
                  children: [
                    {
                      mode: "normal",
                      text: "Unsplash",
                      type: "text",
                      style: "",
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                  direction: "ltr",
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
      updatedAt: "2025-04-05T11:56:07.194Z",
      createdAt: "2025-04-05T11:56:05.711Z",
      url: "/api/media/file/Beautiful%20Image%20from%20Unsplash.jpg",
      thumbnailURL:
        "/api/media/file/Beautiful%20Image%20from%20Unsplash-300x222.jpg",
      filename: "Beautiful Image from Unsplash.jpg",
      mimeType: "image/jpeg",
      filesize: 3519154,
      width: 5405,
      height: 4000,
      focalX: 50,
      focalY: 50,
      sizes: {
        thumbnail: {
          url: "/api/media/file/Beautiful Image from Unsplash-300x222.jpg",
          width: 300,
          height: 222,
          mimeType: "image/jpeg",
          filesize: 16619,
          filename: "Beautiful Image from Unsplash-300x222.jpg",
        },
        square: {
          url: "/api/media/file/Beautiful Image from Unsplash-500x500.jpg",
          width: 500,
          height: 500,
          mimeType: "image/jpeg",
          filesize: 46607,
          filename: "Beautiful Image from Unsplash-500x500.jpg",
        },
        small: {
          url: "/api/media/file/Beautiful Image from Unsplash-600x444.jpg",
          width: 600,
          height: 444,
          mimeType: "image/jpeg",
          filesize: 51864,
          filename: "Beautiful Image from Unsplash-600x444.jpg",
        },
        medium: {
          url: "/api/media/file/Beautiful Image from Unsplash-900x666.jpg",
          width: 900,
          height: 666,
          mimeType: "image/jpeg",
          filesize: 99134,
          filename: "Beautiful Image from Unsplash-900x666.jpg",
        },
        large: {
          url: "/api/media/file/Beautiful Image from Unsplash-1400x1036.jpg",
          width: 1400,
          height: 1036,
          mimeType: "image/jpeg",
          filesize: 202017,
          filename: "Beautiful Image from Unsplash-1400x1036.jpg",
        },
        xlarge: {
          url: "/api/media/file/Beautiful Image from Unsplash-1920x1421.jpg",
          width: 1920,
          height: 1421,
          mimeType: "image/jpeg",
          filesize: 347394,
          filename: "Beautiful Image from Unsplash-1920x1421.jpg",
        },
      },
    },
  },
};
