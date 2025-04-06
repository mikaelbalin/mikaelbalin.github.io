import type { Meta, StoryObj } from "@storybook/react";
import { PostList } from "#components/Post/PostList/PostList";
import { Default as PostItem } from "#components/Post/PostItem/PostItem.stories";
import { PostLatest } from "../PostLatest";
import { Default as PostLatestDefault } from "../PostLatest/PostLatest.stories";

const meta = {
  component: PostList,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PostList>;

export default meta;
type Story = StoryObj<typeof PostList>;

export const Default: Story = {
  args: {
    posts: [
      {
        id: 1,
        slug: "hello-world",
        relatedCategories: PostItem.args?.relatedCategories,
        title: "Hello, World!",
        publishedAt: "2022-01-01T00:00:00Z",
        timeToRead: 5,
      },
      {
        id: 2,
        slug: "lorem-ipsum",
        relatedCategories: PostItem.args?.relatedCategories,
        title: "Lorem Ipsum",
        publishedAt: "2022-02-01T00:00:00Z",
        timeToRead: 10,
      },
    ],
    locale: "en",
    children: (
      <PostLatest
        title={PostLatestDefault.args!.title}
        latestPostsLink={PostLatestDefault.args!.latestPostsLink!}
        locale={PostLatestDefault.args!.locale}
      />
    ),
  },
};
