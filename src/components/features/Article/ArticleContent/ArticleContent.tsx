import { Code, Container } from "@mantine/core";

interface ArticleContentProps {
  data: any;
}

export const ArticleContent = ({ data }: ArticleContentProps) => {
  return (
    <Container>
      <Code block>{JSON.stringify(data, null, 2)}</Code>
    </Container>
  );
};
