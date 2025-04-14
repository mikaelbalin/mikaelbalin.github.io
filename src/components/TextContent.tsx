import { ContentBlock } from "#types/payload";
import { RichText } from "#components/ui/RichText";
import { Content as RichTextContent } from "#components/ui/RichText/types";
import { Container } from "#components/Container";

export type ContentBlockProps = ContentBlock;

export const TextContent = ({ content }: ContentBlockProps) => {
  return (
    <Container>
      <RichText content={content as RichTextContent} />
    </Container>
  );
};
