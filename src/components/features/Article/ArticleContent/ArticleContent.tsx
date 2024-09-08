import { Container } from "@mantine/core";
import componentResolver from "@/lib/component-resolver";

interface ArticleContentProps {
  data: any;
}

export const ArticleContent = ({ data }: ArticleContentProps) => {
  return (
    <Container>
      {data.attributes.blocks.map((block: any, index: number) =>
        componentResolver(block, index),
      )}
    </Container>
  );
};
