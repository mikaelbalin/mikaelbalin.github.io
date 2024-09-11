import {
  Title,
  TitleOrder,
  TypographyStylesProvider,
  Text,
  List,
  ListItem,
  Code,
  Kbd,
  Mark,
} from "@mantine/core";
import Markdown, { ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { DetailedHTMLProps } from "react";
import { IconLink } from "@tabler/icons-react";
import Link from "next/link";

const HeadingRenderer = (
  props: DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > &
    ExtraProps,
) => {
  const order = parseInt(props.node?.tagName.match(/\d+/)?.[0] || "1", 10);
  const childrenString = props.children?.toString();
  const id = childrenString?.replace(/\s+/g, "-").toLowerCase();

  return (
    <Title order={order as TitleOrder} id={id} className="group">
      {props.children}
      <Link
        href={`#${id}`}
        aria-label={`Permalink: ${childrenString}`}
        className="inline-flex opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-black"
      >
        <IconLink className="relative top-[0.12em] w-[1em] h-[1em]" />
      </Link>
    </Title>
  );
};

interface MarkdownTextProps {
  block: {
    content: string;
  };
}

export default function MarkdownText({ block }: MarkdownTextProps) {
  return (
    <section>
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
          p: (props) => <Text className="mb-4">{props.children}</Text>,
          ol: (props) => (
            <List className="mb-4" type="ordered" listStyleType="auto">
              {props.children}
            </List>
          ),
          ul: (props) => (
            <List className="mb-4" type="unordered" listStyleType="initial">
              {props.children}
            </List>
          ),
          li: (props) => <ListItem>{props.children}</ListItem>,
          code: (props) => {
            return <Code>{props.children}</Code>;
          },
          pre: (props) => {
            return <Code block>{props.children}</Code>;
          },
          kbd: (props) => <Kbd>{props.children}</Kbd>,
          mark: (props) => <Mark>{props.children}</Mark>,
        }}
      >
        {block.content}
      </Markdown>
    </section>
  );
}
