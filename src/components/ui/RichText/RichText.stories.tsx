import type { Meta, StoryObj } from "@storybook/react";
import { RichText } from "./RichText";

const meta = {
  title: "RichText",
  component: RichText,
} satisfies Meta<typeof RichText>;

export default meta;
type Story = StoryObj<typeof RichText>;

export const Default: Story = {
  args: {
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Testin ",
                type: "text",
                version: 1,
              },

              {
                detail: 0,
                format: 2,
                mode: "normal",
                style: "",
                text: "title",
                type: "text",
                version: 1,
              },

              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: " try @#",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "heading",
            version: 1,
            tag: "h2",
          },

          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Title 2",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "heading",
            version: 1,
            tag: "h3",
          },

          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Title 3",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "heading",
            version: 1,
            tag: "h4",
          },

          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: " ",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
          },

          {
            children: [],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
          },

          {
            format: "",
            type: "block",
            version: 2,

            fields: {
              id: "6782f46de5ca455aabe220d5",
              style: "note",

              content: {
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Hello ",
                          type: "text",
                          version: 1,
                        },

                        {
                          detail: 0,
                          format: 16,
                          mode: "normal",
                          style: "",
                          text: "helo",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                      textStyle: "",
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  type: "root",
                  version: 1,
                },
              },
              blockName: "Disclaimer",
              blockType: "callout",
            },
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    },
  },
};
