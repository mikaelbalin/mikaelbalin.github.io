import slugify from "@sindresorhus/slugify";
import { Blockquote, List, ListItem, Text, Divider } from "@mantine/core";
import { CMSLink } from "@/components/ui/Link";
import { HeadingRenderer } from "./HeadingRenderer";
import { NodeType } from "./types";
import { cn } from "@/utilities/cn";
import { JSX } from "react";

export const nodeRenderer = ({
  node,
  index,
  children,
  className,
}: {
  node: NodeType;
  index: number;
  children?: (JSX.Element | null)[];
  className?: string;
}) => {
  switch (node.type) {
    case "heading": {
      const fragmentID = slugify(
        (node.children as NodeType[])
          .map((n) => (n.type === "text" ? n.text : ""))
          .join(""),
      );

      return (
        <HeadingRenderer key={index} tag={node?.tag} fragmentID={fragmentID}>
          {children}
        </HeadingRenderer>
      );
    }
    case "paragraph": {
      return (
        <Text key={index} className={cn("mb-8", className)}>
          {children}
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
          {children}
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
            {children}
          </ListItem>
        );
      } else {
        return (
          <ListItem key={index} value={node?.value}>
            {children}
          </ListItem>
        );
      }
    }
    case "quote": {
      return (
        <Blockquote key={index} className="my-8">
          {children}
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
          {children}
        </CMSLink>
      );
    }
    case "horizontalrule": {
      return <Divider key={index} className="mb-8" />;
    }

    default:
      return null;
  }
};
