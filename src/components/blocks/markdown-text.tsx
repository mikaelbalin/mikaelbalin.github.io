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
} from "@mantine/core";
import Markdown, { Components, ExtraProps } from "react-markdown";
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
    <Title order={order as TitleOrder} id={id} className="group mb-4">
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

const components: Partial<Components> = {
  h1: HeadingRenderer,
  h2: HeadingRenderer,
  h3: HeadingRenderer,
  h4: HeadingRenderer,
  h5: HeadingRenderer,
  h6: HeadingRenderer,
  p: (props) => <Text className="mb-6">{props.children}</Text>,
  ol: (props) => (
    <List className="mb-6" type="ordered" listStyleType="auto">
      {props.children}
    </List>
  ),
  ul: (props) => (
    <List className="mb-6" type="unordered" listStyleType="initial">
      {props.children}
    </List>
  ),
  li: (props) => <ListItem>{props.children}</ListItem>,
  code: (props) => <Code>{props.children}</Code>,
  pre: (props) => (
    <Code block className="mb-6">
      {props.children}
    </Code>
  ),
  kbd: (props) => <Kbd>{props.children}</Kbd>,
  mark: (props) => <Mark>{props.children}</Mark>,
  hr: (props) => <Divider className="my-6" />,
  a: (props) => <Anchor href={props.href}>{props.children}</Anchor>,
  table: (props) => (
    <TableScrollContainer minWidth={500} type="native" className="mb-6">
      <Table>{props.children}</Table>
    </TableScrollContainer>
  ),
  thead: (props) => <TableThead>{props.children}</TableThead>,
  tbody: (props) => <TableTbody>{props.children}</TableTbody>,
  tr: (props) => <TableTr>{props.children}</TableTr>,
  th: (props) => <TableTh>{props.children}</TableTh>,
  td: (props) => <TableTd>{props.children}</TableTd>,
};

interface MarkdownTextProps {
  block: {
    id: number;
    content: string;
  };
}

export default function MarkdownText({ block }: MarkdownTextProps) {
  return (
    <section>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {block.content}
      </Markdown>
    </section>
  );
}
