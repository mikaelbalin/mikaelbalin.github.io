import { Container } from "@mantine/core";

interface ArticleContentProps {
  data: any;
}

export const ArticleContent = ({ data }: ArticleContentProps) => {
  return <Container>{JSON.stringify(data, null, 2)}</Container>;
};
