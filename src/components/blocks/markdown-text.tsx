import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownTextProps {
  block: {
    content: string;
  };
}

export default function MarkdownText({ block }: MarkdownTextProps) {
  // TODO: STYLE THE MARKDOWN
  return (
    <section className="">
      <Markdown remarkPlugins={[remarkGfm]}>{block.content}</Markdown>
    </section>
  );
}
