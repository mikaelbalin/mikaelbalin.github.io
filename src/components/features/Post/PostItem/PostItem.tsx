import { cn } from "@/lib/utils";
import { Badge, Group, Text, Stack } from "@mantine/core";

interface PostCardProps {
  title: string;
  date: string;
  timeToRead: number;
  tags: string[];
}

export const PostItem = ({ title, date, timeToRead, tags }: PostCardProps) => {
  const classes = cn(
    "flex items-center gap-x-2",
    "before:content-[''] before:w-2 before:h-2 before:bg-black",
  );
  return (
    <Stack className="border-t py-8 gap-6">
      <div className="text-xl leading-15">{title}</div>
      <Group>
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </Group>
      <Group>
        <Text className={classes}>{date}</Text>
        <Text className={classes}>{timeToRead} min read</Text>
      </Group>
    </Stack>
  );
};
