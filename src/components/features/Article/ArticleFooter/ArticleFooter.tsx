import { Container, Grid, GridCol, Text } from "@mantine/core";
import { Comments } from "../../Comments";

export const ArticleFooter = () => {
  return (
    <Container className="py-10 sm:py-24">
      <Grid
        classNames={{
          root: "border-b border-black dark:border-white pb-14",
          inner: "gap-y-10",
        }}
      >
        <GridCol span={{ base: 12, sm: 6 }} className="flex items-center">
          <Comments />
        </GridCol>
        <GridCol
          span={{ base: 12, sm: 6 }}
          className="flex flex-col justify-center"
        >
          <Text className="mb-6 sm:mb-8">Share this article</Text>
          <div className="flex gap-6 text-xl">
            <div>BlueSky</div>
            <div>LinkedIn</div>
          </div>
        </GridCol>
      </Grid>
    </Container>
  );
};
