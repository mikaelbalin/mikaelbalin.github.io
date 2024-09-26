"use client";

import { Fragment, useRef } from "react";
import { Container, Grid, GridCol } from "@mantine/core";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { Article, CalloutBlock, RichTextBlock } from "@/types/data";
import RichText from "@/components/blocks/RichText";
import { Callout } from "@/components/ui/Callout/Callout";

function blockRenderer(block: RichTextBlock | CalloutBlock) {
  switch (block.__component) {
    case "shared.rich-text":
      return <RichText {...block} />;
    case "shared.callout":
      return <Callout {...block} />;
    default:
      return null;
  }
}

type ArticleContentProps = Article;

export const ArticleContent = (props: ArticleContentProps) => {
  const { blocks } = props;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <Grid>
        <GridCol span={{ base: 12, sm: 9 }} ref={ref}>
          {blocks.map((block) => (
            <Fragment key={`${block.__component}-${block.id}`}>
              {blockRenderer(block)}
            </Fragment>
          ))}
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
