"use client";

import { Fragment, useRef } from "react";
import { Container, Grid, GridCol } from "@mantine/core";
import componentResolver from "@/lib/component-resolver";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";

interface ArticleContentProps {
  data: any;
}

export const ArticleContent = ({ data }: ArticleContentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <Grid>
        <GridCol span={{ base: 12, sm: 9 }} ref={ref}>
          {data.attributes.sections.map((block: any, index: number) => (
            <Fragment key={`${block.__component}-${block.id}`}>
              {componentResolver(block, index)}
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
