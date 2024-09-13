import { Container, Text } from "@mantine/core";
import { Comments } from "../../Comments";

export const ArticleFooter = () => {
  return (
    <Container className="py-10">
      <Comments />
      <Text className="mb-6">Share this article</Text>
      <div className="flex gap-6 text-xl">
        <div>BlueSky</div>
        <div>LinkedIn</div>
      </div>
    </Container>
  );
};
