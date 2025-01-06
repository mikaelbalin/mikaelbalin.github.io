import React, { Fragment, JSX } from "react";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { CMSLink } from "@/components/Link";
import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import type {
  CalloutBlock as CalloutBlockProps,
  MediaBlock as MediaBlockProps,
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
import { Code, Text } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import "@mantine/code-highlight/styles.css";
import { Callout } from "@/components/ui/Callout";

type CodeBlockProps = {
  code: string;
  language?: string;
  blockType: "code";
};

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps | CalloutBlockProps | CodeBlockProps>;

type Props = {
  nodes: NodeTypes[];
};

export function serializeLexical({ nodes }: Props): JSX.Element {
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
            return serializeLexical({ nodes: node.children as NodeTypes[] });
          }
        };

        const serializedChildren =
          "children" in node ? serializedChildrenFn(node) : "";

        if (node.type === "block") {
          const block = node.fields;

          const blockType = block?.blockType;

          if (!block || !blockType) {
            return null;
          }

          switch (blockType) {
            case "mediaBlock":
              return (
                <MediaBlock
                  className="col-start-1 col-span-3"
                  imgClassName="m-0"
                  key={index}
                  {...block}
                  captionClassName="mx-auto max-w-[48rem]"
                  enableGutter={false}
                  disableInnerContainer={true}
                />
              );
            case "callout":
              return <Callout key={index} {...block} />;
            case "code":
              return (
                <CodeHighlight
                  key={index}
                  className="mb-8"
                  code={block.code}
                  language={block.language}
                />
              );
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
                <Text key={index} className="mb-8">
                  {serializedChildren}
                </Text>
              );
            }
            case "heading": {
              const Tag = node?.tag;
              return (
                <Tag className="col-start-2" key={index}>
                  {serializedChildren}
                </Tag>
              );
            }
            case "list": {
              const Tag = node?.tag;
              return (
                <Tag className="list col-start-2" key={index}>
                  {serializedChildren}
                </Tag>
              );
            }
            case "listitem": {
              if (node?.checked != null) {
                return (
                  <li
                    aria-checked={node.checked ? "true" : "false"}
                    className={` ${node.checked ? "" : ""}`}
                    key={index}
                    role="checkbox"
                    tabIndex={-1}
                    value={node?.value}
                  >
                    {serializedChildren}
                  </li>
                );
              } else {
                return (
                  <li key={index} value={node?.value}>
                    {serializedChildren}
                  </li>
                );
              }
            }
            case "quote": {
              return (
                <blockquote className="col-start-2" key={index}>
                  {serializedChildren}
                </blockquote>
              );
            }
            case "link": {
              const fields = node.fields;

              return (
                <CMSLink
                  key={index}
                  newTab={Boolean(fields?.newTab)}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  reference={fields.doc as any}
                  type={fields.linkType === "internal" ? "reference" : "custom"}
                  url={fields.url}
                >
                  {serializedChildren}
                </CMSLink>
              );
            }

            default:
              return null;
          }
        }
      })}
    </Fragment>
  );
}
