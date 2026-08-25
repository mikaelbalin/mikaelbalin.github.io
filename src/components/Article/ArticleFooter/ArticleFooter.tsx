"use client";

import { Comments } from "#components/Article/Comments";
import { Container } from "#components/Container";
import { ShareButton } from "#components/ui/ShareButton";
import { Text } from "#components/ui/Text";

interface ArticleFooterProps {
  url: string;
  bskyPostUri?: string | null;
}

export const ArticleFooter = (props: ArticleFooterProps) => {
  const { url, bskyPostUri } = props;

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`Check out this interesting article: ${url}`)}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  };

  const shareOnBlueSky = () => {
    const blueSkyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(`I just read this great post: ${url}`)}`;
    window.open(blueSkyUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Container className="p-10 sm:p-24">
      <div className="flex flex-col gap-10 sm:flex-row justify-between border-b border-foreground pb-14">
        {bskyPostUri && <Comments uri={bskyPostUri} />}

        <div
          className="flex flex-col items-start justify-center gap-6 sm:gap-8"
        >
          <Text>Share this article</Text>
          <div className="flex gap-6">
            <ShareButton onClick={shareOnBlueSky}>BlueSky</ShareButton>
            <ShareButton onClick={shareOnLinkedIn}>LinkedIn</ShareButton>
          </div>
        </div>
      </div>
    </Container>
  );
};
