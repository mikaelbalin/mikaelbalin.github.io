import { TypographyStylesProvider } from "@mantine/core";
import Markdown, { ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { createElement, DetailedHTMLProps } from "react";

const HeadingRenderer = (
  props: DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > &
    ExtraProps,
) => {
  console.log({ props });
  const Tag = props.node?.tagName || "h1";
  const id = props.children?.toString().replace(/\s+/g, "-").toLowerCase();
  return createElement(
    Tag,
    { id },
    <a href={`#${id}`} style={{ textDecoration: "none", color: "inherit" }}>
      {props.children}
    </a>,
  );
};

interface MarkdownTextProps {
  block: {
    content: string;
  };
}

export default function MarkdownText({ block }: MarkdownTextProps) {
  return (
    <TypographyStylesProvider component="section" className="">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: HeadingRenderer,
          h2: HeadingRenderer,
          h3: HeadingRenderer,
          h4: HeadingRenderer,
          h5: HeadingRenderer,
          h6: HeadingRenderer,
        }}
      >
        {block.content}
      </Markdown>
    </TypographyStylesProvider>
  );
}
