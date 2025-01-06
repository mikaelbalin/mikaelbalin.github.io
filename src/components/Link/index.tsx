import Link from "next/link";
import React from "react";
import { DefaultDocumentIDType, JsonValue } from "payload";
import { Anchor } from "@mantine/core";

type CMSLinkType = {
  children?: React.ReactNode;
  className?: string;
  label?: string | null;
  newTab?: boolean | null;
  reference?: {
    relationTo: string;
    value:
      | {
          [key: string]: JsonValue;
          id: DefaultDocumentIDType;
        }
      | DefaultDocumentIDType;
  } | null;
  type?: "custom" | "reference" | null;
  url?: string | null;
};

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const { type, children, className, label, newTab, reference, url } = props;

  const href =
    type === "reference" &&
    typeof reference?.value === "object" &&
    reference.value.slug
      ? `${reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""}/${
          reference.value.slug
        }`
      : url;

  if (!href) return null;

  const newTabProps = newTab
    ? { rel: "noopener noreferrer", target: "_blank" }
    : {};

  return (
    <Anchor
      className={className}
      component={Link}
      href={href || url || ""}
      {...newTabProps}
    >
      {label && label}
      {children && children}
    </Anchor>
  );
};
