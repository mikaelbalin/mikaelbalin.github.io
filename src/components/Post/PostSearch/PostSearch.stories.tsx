import type { Meta, StoryObj } from "@storybook/react";
import { PostSearch } from "./PostSearch";

const meta = {
  component: PostSearch,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PostSearch>;

export default meta;
type Story = StoryObj<typeof PostSearch>;

export const Default: Story = {
  args: {
    title: "Search by category",
    categories: [
      {
        id: 1,
        breadcrumbs: [
          {
            url: "/tag1",
            label: "Astro",
          },
          {
            url: "/tag2",
            label: "CLI",
          },
          {
            url: "/tag3",
            label: "CSS",
          },
        ],
      },
      {
        id: 2,
        breadcrumbs: [
          {
            url: "/tag2",
            label: "CLI",
          },
        ],
      },
      {
        id: 3,
        breadcrumbs: [
          {
            url: "/tag3",
            label: "Database",
          },
        ],
      },
      {
        id: 4,
        breadcrumbs: [
          {
            url: "/tag4",
            label: "Web platform",
          },
        ],
      },
      {
        id: 5,
        breadcrumbs: [
          {
            url: "/tag5",
            label: "Docker",
          },
        ],
      },
      {
        id: 6,
        breadcrumbs: [
          {
            url: "/tag6",
            label: "Networking",
          },
        ],
      },
      {
        id: 7,
        breadcrumbs: [
          {
            url: "/tag7",
            label: "Next. JS",
          },
        ],
      },
      {
        id: 8,
        breadcrumbs: [
          {
            url: "/tag8",
            label: "React",
          },
        ],
      },
      {
        id: 9,
        breadcrumbs: [
          {
            url: "/tag9",
            label: "Svelte",
          },
        ],
      },
      {
        id: 10,
        breadcrumbs: [
          {
            url: "/tag10",
            label: "Tailwind CSS",
          },
        ],
      },
    ],
  },
};
