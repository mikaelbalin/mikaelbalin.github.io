import React, { Fragment, JSX, PropsWithChildren } from "react";
import { MediaBlock } from "@/components/ui/MediaBlock";
import { CMSLink } from "@/components/ui/Link";
import { SerializedTextNode } from "@payloadcms/richtext-lexical";
import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from "@payloadcms/richtext-lexical/lexical";
import {
  Blockquote,
  Code,
  Divider,
  Kbd,
  List,
  ListItem,
  Table,
  TableData,
  TableScrollContainer,
  Text,
  Title,
  TitleOrder,
} from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import "@mantine/code-highlight/styles.css";
import { Callout } from "@/components/ui/Callout";
import Link from "next/link";
import { cn } from "@/utilities/cn";
import slugify from "@sindresorhus/slugify";
import { NodeType } from "./types";

const HeadingRenderer = (
  props: PropsWithChildren<{
    tag: string;
    fragmentID: string;
  }>,
) => {
  const { tag, children, fragmentID } = props;
  const order = parseInt(tag.match(/\d+/)?.[0] || "1", 10);

  return (
    <Title
      id={fragmentID}
      order={order as TitleOrder}
      size={`h${order + 1}`}
      className="group mb-4"
    >
      {children}&nbsp;
      <Link
        href={`#${fragmentID}`}
        aria-label={`Permalink: ${fragmentID}`}
        className="inline-flex opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-[var(--mantine-color-blue-6)]"
      >
        #
      </Link>
    </Title>
  );
};

function formatTextNode(index: number, node: SerializedTextNode): JSX.Element {
  const { text } = node;
  let element: JSX.Element = <Fragment key={index}>{text}</Fragment>;

  if (node.format & IS_BOLD) {
    element = (
      <Text key={index} component="strong" fw={700}>
        {text}
      </Text>
    );
  }

  if (node.format & IS_ITALIC) {
    element = (
      <Text key={index} component="em" fs="italic">
        {text}
      </Text>
    );
  }

  if (node.format & IS_STRIKETHROUGH) {
    element = (
      <Text key={index} component="span" td="line-through">
        {text}
      </Text>
    );
  }

  if (node.format & IS_UNDERLINE) {
    element = (
      <Text key={index} component="span" td="underline">
        {text}
      </Text>
    );
  }

  if (node.format & IS_CODE) {
    element = <Code key={index}>{text}</Code>;
  }

  if (node.format & IS_SUBSCRIPT) {
    element = <sub key={index}>{text}</sub>;
  }

  if (node.format & IS_SUPERSCRIPT) {
    element = <sup key={index}>{text}</sup>;
  }

  return element;
}

type Args = {
  nodes?: NodeType[];
  className?: string;
};

export function serializeLexical({
  nodes,
  className,
}: Args): (JSX.Element | null)[] | undefined {
  return nodes?.map((node, index): JSX.Element | null => {
    if (!node) {
      return null;
    }

    if (node.type === "text") {
      return formatTextNode(index, node);
    }

    if (node.type === "block" || node.type === "inlineBlock") {
      const block = node.fields;

      const blockType = block?.blockType;

      if (!block || !blockType) {
        return null;
      }

      switch (blockType) {
        case "mediaBlock":
          return (
            <MediaBlock
              key={index}
              media={block.media}
              blockType={block.blockType}
            >
              {serializeLexical({
                nodes:
                  typeof block.media === "object"
                    ? (block.media.caption?.root.children as NodeType[])
                    : [],
                className: cn("!text-sm", className),
              })}
            </MediaBlock>
          );
        case "callout":
          return (
            <Callout
              key={index}
              blockName={block.blockName}
              style={block.style}
            >
              {serializeLexical({
                nodes: block.content.root.children as NodeType[],
                className: cn("mb-0", className),
              })}
            </Callout>
          );
        case "code":
          return (
            <CodeHighlight
              key={index}
              className="mb-8"
              code={block.code}
              language={block.language}
            />
          );
        case "table":
          return (
            <TableScrollContainer
              key={index}
              minWidth={undefined}
              type="native"
              className="mb-8"
            >
              <Table
                data={block.content as TableData}
                highlightOnHover
                withTableBorder
                stickyHeader
              />
            </TableScrollContainer>
          );
        case "kbd":
          return <Kbd key={index}>{block.key}</Kbd>;
        default:
          return null;
      }
    } else {
      const serializedChildren =
        "children" in node
          ? node.children == null
            ? undefined
            : serializeLexical({
                nodes: node.children as NodeType[],
                className,
              })
          : undefined;

      switch (node.type) {
        case "heading": {
          const fragmentID = slugify(
            (node.children as NodeType[])
              .map((n) => (n.type === "text" ? n.text : ""))
              .join(""),
          );

          return (
            <HeadingRenderer
              key={index}
              tag={node?.tag}
              fragmentID={fragmentID}
            >
              {serializedChildren}
            </HeadingRenderer>
          );
        }
        case "paragraph": {
          return (
            <Text key={index} className={cn("mb-8", className)}>
              {serializedChildren}
            </Text>
          );
        }
        case "linebreak": {
          return <br key={index} />;
        }
        case "list": {
          return (
            <List
              key={index}
              type={node?.tag === "ol" ? "ordered" : "unordered"}
              withPadding
            >
              {serializedChildren}
            </List>
          );
        }
        case "listitem": {
          if (node?.checked != null) {
            return (
              <ListItem
                aria-checked={node.checked ? "true" : "false"}
                className={` ${node.checked ? "" : ""}`}
                key={index}
                role="checkbox"
                tabIndex={-1}
                value={node?.value}
              >
                {serializedChildren}
              </ListItem>
            );
          } else {
            return (
              <ListItem key={index} value={node?.value}>
                {serializedChildren}
              </ListItem>
            );
          }
        }
        case "quote": {
          return (
            <Blockquote key={index} className="my-8">
              {serializedChildren}
            </Blockquote>
          );
        }
        case "link": {
          const fields = node.fields;

          return (
            <CMSLink
              className={className}
              key={index}
              newTab={Boolean(fields?.newTab)}
              reference={fields.doc}
              type={fields.linkType === "internal" ? "reference" : "custom"}
              url={fields.url}
            >
              {serializedChildren}
            </CMSLink>
          );
        }
        case "horizontalrule": {
          return <Divider key={index} className="mb-8" />;
        }

        default:
          return null;
      }
    }
  });
}
