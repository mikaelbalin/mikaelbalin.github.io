import { Article } from "@/data/loaders";
import { cn } from "@/lib/utils";
import { Badge, Group, Text } from "@mantine/core";
import Link from "next/link";

type PostCardProps = Article;

export const PostItem = ({
  title,
  slug,
  categories,
  publishedAt,
}: PostCardProps) => {
  const classes = cn(
    "flex items-center gap-x-2",
    "before:content-[''] before:w-2 before:h-2 before:bg-black",
  );

  const tags = categories.data;
  const date = new Date(publishedAt);

  return (
    <Link href={`/blog/${slug}`} className="flex flex-col border-t py-8 gap-6">
      <div className="text-xl leading-15">{title}</div>
      <Group>
        {tags.map((tag) => (
          <Badge key={tag.id}>{tag.attributes.name}</Badge>
        ))}
      </Group>
      <Group>
        <Text className={classes}>{date.toLocaleDateString()}</Text>
        <Text className={classes}>0 min read</Text>
      </Group>
    </Link>
  );
};
