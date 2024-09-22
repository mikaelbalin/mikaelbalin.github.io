import {
  Title,
  TitleOrder,
  Text,
  List,
  ListItem,
  Code,
  Kbd,
  Mark,
  Divider,
  Anchor,
  Table,
  TableThead,
  TableTbody,
  TableTr,
  TableTh,
  TableTd,
  TableScrollContainer,
  Blockquote,
} from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import Markdown, { Components, ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import Link from "next/link";
import "@mantine/code-highlight/styles.css";
import { RichTextBlock } from "@/types/data";

const HeadingRenderer = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > &
    ExtraProps,
) => {
  const order = parseInt(props.node?.tagName.match(/\d+/)?.[0] || "1", 10);
  const childrenString = props.children?.toString();
  const id = childrenString?.replace(/\s+/g, "-").toLowerCase();

  return (
    <Title
      order={order as TitleOrder}
      size={`h${order + 1}`}
      id={id}
      className="group mb-4"
    >
      {props.children}&nbsp;
      <Link
        href={`#${id}`}
        aria-label={`Permalink: ${childrenString}`}
        className="inline-flex opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-[var(--mantine-color-blue-6)]"
      >
        #
      </Link>
    </Title>
  );
};

const components: Partial<Components> = {
  h1: HeadingRenderer,
  h2: HeadingRenderer,
  h3: HeadingRenderer,
  h4: HeadingRenderer,
  p: (props) => <Text className="mb-8">{props.children}</Text>,
  ol: (props) => (
    <List className="mb-8" type="ordered" listStyleType="auto">
      {props.children}
    </List>
  ),
  ul: (props) => (
    <List className="mb-8" type="unordered" listStyleType="initial">
      {props.children}
    </List>
  ),
  li: (props) => <ListItem>{props.children}</ListItem>,
  code: (props) => <Code>{props.children}</Code>,
  pre: (props) => {
    const element = props.node?.children.find(
      (node) => node.type === "element",
    );
    if (!element) {
      return null;
    }

    const text = element.children.find((node) => node.type === "text");
    if (!text) {
      return null;
    }

    return <CodeHighlight code={text.value} language="tsx" className="mb-8" />;
  },
  kbd: (props) => <Kbd>{props.children}</Kbd>,
  mark: (props) => <Mark>{props.children}</Mark>,
  hr: (props) => <Divider className="my-8" />,
  a: (props) => (
    <Anchor component={Link} href={props.href || "/"}>
      {props.children}
    </Anchor>
  ),
  table: (props) => (
    <TableScrollContainer minWidth={undefined} type="native" className="mb-8">
      <Table highlightOnHover>{props.children}</Table>
    </TableScrollContainer>
  ),
  thead: (props) => <TableThead>{props.children}</TableThead>,
  tbody: (props) => <TableTbody>{props.children}</TableTbody>,
  tr: (props) => <TableTr>{props.children}</TableTr>,
  th: (props) => <TableTh>{props.children}</TableTh>,
  td: (props) => <TableTd>{props.children}</TableTd>,
  blockquote: (props) => (
    <Blockquote className="my-8" cite="– Forrest Gump">
      {props.children}
    </Blockquote>
  ),
};

type MarkdownTextProps = RichTextBlock;

export default function RichText(props: MarkdownTextProps) {
  const { body } = props;

  return (
    <section>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {body}
      </Markdown>
    </section>
  );
}
