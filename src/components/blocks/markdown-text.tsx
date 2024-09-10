import { TypographyStylesProvider } from "@mantine/core";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownTextProps {
  block: {
    content: string;
  };
}

export default function MarkdownText({ block }: MarkdownTextProps) {
  return (
    <TypographyStylesProvider component="section" className="">
      <Markdown remarkPlugins={[remarkGfm]}>{block.content}</Markdown>
    </TypographyStylesProvider>
  );
}
