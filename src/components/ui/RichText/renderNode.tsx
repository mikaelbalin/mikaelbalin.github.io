import { CMSLink } from "#components/ui/CMSLink";
import { Text } from "#components/ui/Text";
import { Title } from "#components/ui/Title";
import { cn } from "#lib/utils";
import slugify from "@sindresorhus/slugify";
import Link from "next/link";
import { JSX } from "react";
import { ContentChildren } from "./types";
import { IconLink } from "@tabler/icons-react";
import { Table, TableCell, TableRow, TableBody } from "#components/ui/Table";

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
          className="group relative mb-4 w-fit pr-[1em] hover:cursor-pointer sm:mb-6"
        >
          {children}&nbsp;
          <Link
            href={`#${fragmentID}`}
            aria-label={`Permalink: ${fragmentID}`}
            className="absolute right-0 top-1/2 ml-2 inline-flex -translate-y-1/2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <IconLink className="h-[1em] w-[1em]" />
          </Link>
        </Title>
      );
    }
    case "paragraph": {
      return (
        <Text
          key={index}
          className={cn(
            "mb-6 leading-6 group-[&]:mb-0 sm:mb-8 group-[&]:sm:mb-0",
            className,
          )}
        >
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
            "mb-6 ml-8 sm:mb-8 [&>li]:mt-2",
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
        <blockquote key={index} className="my-6 sm:mb-8">
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
      return <hr key={index} className="mb-6 sm:mb-8" />;
    }
    case "table": {
      return (
        <Table key={index} className="mb-6 sm:mb-8">
          <TableBody>{children}</TableBody>
        </Table>
      );
    }
    case "tablerow": {
      return <TableRow key={index}>{children}</TableRow>;
    }
    case "tablecell": {
      return (
        <TableCell key={index} className="group">
          {children}
        </TableCell>
      );
    }
    default:
      return null;
  }
};
