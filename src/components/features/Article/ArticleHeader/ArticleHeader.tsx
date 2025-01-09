import { TextBullet } from "@/components/ui/TextBullet";
import { Category } from "@/types/payload";
import { Badge, Container, Group, SimpleGrid, Title } from "@mantine/core";

interface ArticleHeaderProps {
  categories: Category[];
  title: string;
  date: string;
  timeToRead?: number | null;
}

export const ArticleHeader = ({
  categories,
  title,
  date,
  timeToRead,
}: ArticleHeaderProps) => {
  return (
    <Container
      component="header"
      className="mt-16 pt-6 pb-16 sm:mt-19.5 sm:pt-24 sm:pb-24"
    >
      <Title size="h2" className="mb-8 sm:mb-20">
        {title}
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} className="gap-8">
        <Group className="gap-8">
          <TextBullet>{date}</TextBullet>
          {timeToRead && <TextBullet>{timeToRead} min read</TextBullet>}
        </Group>
        <Group className="sm:justify-end">
          {categories.map((category) => (
            <Badge key={category.id} size="lg">
              {category.title}
            </Badge>
          ))}
        </Group>
      </SimpleGrid>
    </Container>
  );
};
