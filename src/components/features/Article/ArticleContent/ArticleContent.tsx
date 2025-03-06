import { Container, Grid, GridCol } from "@mantine/core";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { RichText } from "@/components/ui/RichText";
import { Content } from "@/components/ui/RichText/types";

type ArticleContentProps = {
  content: Content;
};

export const ArticleContent = (props: ArticleContentProps) => {
  const { content } = props;

  return (
    <Container>
      <Grid>
        <GridCol span={{ base: 12, sm: 9 }} id="article-content">
          <RichText content={content} className="-mb-8" />
        </GridCol>
        <GridCol
          component="aside"
          span={1}
          offset={2}
          className="hidden sm:block"
        >
          <ProgressIndicator targetId="article-content" />
        </GridCol>
      </Grid>
    </Container>
  );
};
