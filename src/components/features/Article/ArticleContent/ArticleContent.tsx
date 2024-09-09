"use client";

import { Container, Grid, GridCol } from "@mantine/core";
import componentResolver from "@/lib/component-resolver";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { useRef } from "react";

interface ArticleContentProps {
  data: any;
}

export const ArticleContent = ({ data }: ArticleContentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <Grid>
        <GridCol span={{ base: 12, sm: 9 }} ref={ref}>
          {data.attributes.blocks.map((block: any, index: number) => (
            <div key={block.id} className="mb-8">
              {componentResolver(block, index)}
            </div>
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
