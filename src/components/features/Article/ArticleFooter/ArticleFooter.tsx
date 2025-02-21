"use client";

import { ShareButton } from "@/components/ui/ShareButton";
import { Container, Grid, GridCol, Text } from "@mantine/core";
// import { Comments } from "@/components/features/Comments";

interface ArticleFooterProps {
  url: string;
}

export const ArticleFooter = (props: ArticleFooterProps) => {
  const { url } = props;

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, "_blank");
  };

  const shareOnBlueSky = () => {
    const blueSkyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(url)}`;
    window.open(blueSkyUrl, "_blank");
  };

  return (
    <Container className="py-10 sm:py-24">
      <Grid
        classNames={{
          root: "border-b border-black dark:border-white pb-14",
          inner: "gap-y-10",
        }}
      >
        {/* <GridCol span={{ base: 12, sm: 6 }} className="flex items-center">
          <Comments />
        </GridCol> */}
        <GridCol
          // span={{ base: 12, sm: 6 }}
          className="flex flex-col justify-center items-center"
        >
          <Text className="mb-6 sm:mb-8">Share this article</Text>
          <div className="flex gap-6 text-xl">
            <ShareButton onClick={shareOnBlueSky}>BlueSky</ShareButton>
            <ShareButton onClick={shareOnLinkedIn}>LinkedIn</ShareButton>
          </div>
        </GridCol>
      </Grid>
    </Container>
  );
};
