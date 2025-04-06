import { CMSLink } from "#components/ui/CMSLink";
import { Text } from "#components/ui/Text";
import { Title } from "#components/ui/Title";
import { cn } from "#lib/utils";
import slugify from "@sindresorhus/slugify";
import Link from "next/link";
import { JSX } from "react";
import { ContentChildren } from "./types";

const isSupportedTitleOrder = (order: number): order is 2 | 3 | 4 => {
  return order >= 2 && order <= 4;
};

const isSupportedTitleSize = (order: number): order is 4 | 5 | 6 => {
  return order >= 2 && order <= 6;
};

export const renderNode = ({
  node,
  index,
  children,
  className,
}: {
  node: ContentChildren[number];
  index: number;
  children?: (JSX.Element | null)[];
  className?: string;
}) => {
  switch (node.type) {
    case "heading": {
      const tag = node.tag;

      const fragmentID = slugify(
        node.children.map((n) => (n.type === "text" ? n.text : "")).join(""),
      );

      const headingLevel = parseInt(tag.match(/\d+/)?.[0] || "2", 10);
      const order = isSupportedTitleOrder(headingLevel) ? headingLevel : 2;
      const potentialSize = order + 2;
      const size = isSupportedTitleSize(potentialSize)
        ? potentialSize
        : undefined;

      return (
        <Title
          key={index}
          id={fragmentID}
          order={order}
          size={size}
          className="group mb-4"
        >
          {children}&nbsp;
          <Link
            href={`#${fragmentID}`}
            aria-label={`Permalink: ${fragmentID}`}
            className="ml-2 inline-flex text-[var(--mantine-color-blue-6)] opacity-0 transition-opacity group-hover:opacity-100"
          >
            #
          </Link>
        </Title>
      );
    }
    case "paragraph": {
      return (
        <Text key={index} className={cn("mb-8 leading-6", className)}>
          {children}
        </Text>
      );
    }
    case "linebreak": {
      return <br key={index} />;
    }
    case "list": {
      const isOrdered = node?.tag === "ol";
      const List = isOrdered ? "ol" : "ul";

      return (
        <List
          key={index}
          className={cn(
            "my-8 ml-8 [&>li]:mt-2",
            isOrdered ? "list-decimal" : "list-disc",
          )}
        >
          {children}
        </List>
      );
    }
    case "listitem": {
      if (node?.checked != null) {
        return <li key={index}>{children}</li>;
      } else {
        return (
          <li key={index} value={node?.value}>
            {children}
          </li>
        );
      }
    }
    case "quote": {
      return (
        <blockquote key={index} className="my-8">
          {children}
        </blockquote>
      );
    }
    case "link": {
      const fields = node.fields;

      return (
        <CMSLink
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
      return <hr key={index} className="mb-8" />;
    }
    default:
      return null;
  }
};
