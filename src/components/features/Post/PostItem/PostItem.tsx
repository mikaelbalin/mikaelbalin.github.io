import { TextBullet } from "@/components/ui/TextBullet";
import { Post } from "@/types/data";
import { Badge, Group, Text } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";

type PostCardProps = Post;

export const PostItem = ({ title, slug, tags, publishedAt }: PostCardProps) => {
  const date = new Date(publishedAt);

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex border-t py-8 transition-colors sm:hover:bg-appLightColorBeige dark:sm:hover:bg-appDarkColorCoalBlack"
    >
      <div className="flex flex-col gap-6 sm:w-1/2 transition-transform sm:group-hover:translate-x-6">
        <div className="text-xl leading-15 sm:text-4xl sm:font-medium">
          {title}
        </div>
        <Group>
          {tags.map((tag) => (
            <Badge key={tag.id}>{tag.name}</Badge>
          ))}
        </Group>
        <Group>
          <TextBullet>{date.toLocaleDateString()}</TextBullet>
          <TextBullet>0 min read</TextBullet>
        </Group>
      </div>
      <div className="hidden sm:flex items-center justify-end sm:w-1/2 transition-transform group-hover:-translate-x-6">
        <Text
          size="xl"
          className="opacity-0 transition-opacity group-hover:opacity-100"
        >
          Read article <IconArrowNarrowRight className="inline-block" />
        </Text>
      </div>
    </Link>
  );
};
