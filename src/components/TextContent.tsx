import { Container } from "#components/Container";
import { RichText } from "#components/ui/RichText";
import type { Content as RichTextContent } from "#components/ui/RichText/types";
import type { ContentBlock } from "#types/payload";

export type ContentBlockProps = ContentBlock;

export const TextContent = ({ content }: ContentBlockProps) => {
  return (
    <Container>
      <RichText content={content as RichTextContent} />
    </Container>
  );
};
