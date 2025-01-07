"use client";

import { useRef } from "react";
import { Container, Grid, GridCol } from "@mantine/core";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { Post } from "@/types/payload";
import RichText from "@/components/ui/RichText";

type ArticleContentProps = {
  content: Post["content"];
};

export const ArticleContent = (props: ArticleContentProps) => {
  const { content } = props;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <Grid>
        <GridCol span={{ base: 12, sm: 9 }} ref={ref}>
          <RichText content={content} className="-mb-8" />
        </GridCol>
        <GridCol
          component="aside"
          span={1}
          offset={2}
          className="hidden sm:block"
        >
          <ProgressIndicator target={ref} />
        </GridCol>
      </Grid>
    </Container>
  );
};
