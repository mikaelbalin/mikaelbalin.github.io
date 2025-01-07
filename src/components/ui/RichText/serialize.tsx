import React, { Fragment, JSX, PropsWithChildren } from "react";
import { MediaBlock } from "@/components/ui/MediaBlock";
import { CMSLink } from "@/components/Link";
import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import type {
  CalloutBlock as CalloutBlockProps,
  MediaBlock as MediaBlockProps,
  TableBlock,
} from "@/payload-types";
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
  Text,
  Title,
  TitleOrder,
} from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import "@mantine/code-highlight/styles.css";
import { Callout } from "@/components/ui/Callout";
import Link from "next/link";
import { JsonObject } from "payload";
import { cn } from "@/utilities/cn";

const HeadingRenderer = (
  props: PropsWithChildren<{
    tag: string;
  }>,
) => {
  const { tag, children } = props;
  const order = parseInt(tag.match(/\d+/)?.[0] || "1", 10);
  const childrenString = children?.toString();
  const id = childrenString?.replace(/\s+/g, "-").toLowerCase();

  return (
    <Title
      id={id}
      order={order as TitleOrder}
      size={`h${order + 1}`}
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

type CodeBlockProps = {
  code: string;
  language?: string;
  blockType: "code";
};

type KbdInlineBlockProps = {
  key: string;
  id?: string | null;
  blockType: "kbd";
};

type CustomBlockNode<TBlockFields extends JsonObject = JsonObject> = Omit<
  SerializedBlockNode<TBlockFields>,
  "type"
> & {
  type: "inlineBlock" | "block";
};

export type NodeTypes =
  | DefaultNodeTypes
  | CustomBlockNode<
      | MediaBlockProps
      | CalloutBlockProps
      | CodeBlockProps
      | KbdInlineBlockProps
      | TableBlock
    >;

type Props = {
  nodes: NodeTypes[];
  className?: string;
};

export function serializeLexical({ nodes, className }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null;
        }

        if (node.type === "text") {
          let text = <React.Fragment key={index}>{node.text}</React.Fragment>;
          if (node.format & IS_BOLD) {
            text = (
              <Text key={index} component="strong" fw={700}>
                {text}
              </Text>
            );
          }
          if (node.format & IS_ITALIC) {
            text = (
              <Text key={index} component="em" fs="italic">
                {text}
              </Text>
            );
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <Text key={index} component="span" td="line-through">
                {text}
              </Text>
            );
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <Text key={index} component="span" td="underline">
                {text}
              </Text>
            );
          }
          if (node.format & IS_CODE) {
            text = <Code key={index}>{node.text}</Code>;
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>;
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>;
          }

          return text;
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if (node.children == null) {
            return null;
          } else {
            if (node?.type === "list" && node?.listType === "check") {
              for (const item of node.children) {
                if ("checked" in item) {
                  if (!item?.checked) {
                    item.checked = false;
                  }
                }
              }
            }
            return serializeLexical({
              nodes: node.children as NodeTypes[],
              className,
            });
          }
        };

        const serializedChildren =
          "children" in node ? serializedChildrenFn(node) : "";

        if (node.type === "block" || node.type === "inlineBlock") {
          const block = node.fields;

          const blockType = block?.blockType;

          if (!block || !blockType) {
            return null;
          }

          switch (blockType) {
            case "mediaBlock":
              return <MediaBlock key={index} {...block} />;
            case "callout":
              return (
                <Callout
                  key={index}
                  blockName={block.blockName}
                  style={block.style}
                >
                  {serializeLexical({
                    nodes: block.content.root.children as NodeTypes[],
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
                <Table
                  key={index}
                  className="mb-8"
                  data={block.content as TableData}
                  highlightOnHover
                  withTableBorder
                  stickyHeader
                />
              );
            case "kbd":
              return <Kbd key={index}>{block.key}</Kbd>;
            default:
              return null;
          }
        } else {
          switch (node.type) {
            case "linebreak": {
              return <br key={index} />;
            }
            case "paragraph": {
              return (
                <Text key={index} className={cn("mb-8", className)}>
                  {serializedChildren}
                </Text>
              );
            }
            case "heading": {
              return (
                <HeadingRenderer key={index} tag={node?.tag}>
                  {serializedChildren}
                </HeadingRenderer>
              );
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
      })}
    </Fragment>
  );
}
