import { TextBullet } from "@/components/ui/TextBullet";
import { TagListResponseDataItem } from "@/types/data";
import { Badge, Container, Group, Title } from "@mantine/core";

interface ArticleHeaderProps {
  tags: TagListResponseDataItem[];
  title: string;
}

export const ArticleHeader = ({ tags, title }: ArticleHeaderProps) => {
  return (
    <Container component="header" className="mt-16 pt-6">
      <Title size="h2" className="mb-8">
        {title}
      </Title>
      <Group className="mb-8 gap-8">
        <TextBullet>Feb 17, 2024</TextBullet>
        <TextBullet>15 min reads</TextBullet>
      </Group>
      <Group>
        {tags.map((tag) => (
          <Badge key={tag.id}>{tag.attributes.name}</Badge>
        ))}
      </Group>
    </Container>
  );
};
