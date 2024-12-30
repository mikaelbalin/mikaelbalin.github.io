import { TextBullet } from "@/components/ui/TextBullet";
// import { Tag } from "@/types/data";
import {
  // Badge,
  Container,
  Group,
  SimpleGrid,
  Title,
} from "@mantine/core";

interface ArticleHeaderProps {
  // tags: Tag[];
  title: string;
}

export const ArticleHeader = ({
  // tags,
  title,
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
          <TextBullet>Feb 17, 2024</TextBullet>
          <TextBullet>15 min reads</TextBullet>
        </Group>
        <Group className="sm:justify-end">
          {/* {tags.map((tag) => (
            <Badge key={tag.id} size="lg">
              {tag.name}
            </Badge>
          ))} */}
        </Group>
      </SimpleGrid>
    </Container>
  );
};
