import { Badge, Group, Title, Text } from "@mantine/core";
import classes from "./PostItem.module.css";

interface PostCardProps {
  title: string;
  date: string;
  timeToRead: number;
  tags: string[];
}

export const PostItem = ({ title, date, timeToRead, tags }: PostCardProps) => {
  return (
    <Group className={classes.root}>
      <Title component="div" size="h2">
        {title}
      </Title>
      <Group>
        {tags.map((tag) => (
          <Badge key={tag} color="blue">
            tag
          </Badge>
        ))}
      </Group>
      <Group>
        <Text>{date}</Text>
        <Text>{timeToRead} min read</Text>
      </Group>
    </Group>
  );
};
