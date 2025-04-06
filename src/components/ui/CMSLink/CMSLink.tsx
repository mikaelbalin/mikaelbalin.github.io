import Link from "next/link";
import React from "react";
import { DefaultDocumentIDType, JsonValue } from "payload";
import { cn } from "#lib/utils";

type CMSLinkProps = {
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

export const CMSLink: React.FC<CMSLinkProps> = (props) => {
  const { type, children, className, label, newTab, reference, url } = props;

  const prefixPath =
    reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : "";

  const href =
    type === "reference" &&
    typeof reference?.value === "object" &&
    reference.value.slug
      ? `${prefixPath}/${reference.value.slug}`
      : url;

  if (!href) return null;

  const newTabProps = newTab
    ? { rel: "noopener noreferrer", target: "_blank" }
    : {};

  return (
    <Link
      className={cn("underline underline-offset-4", className)}
      href={href || url || ""}
      {...newTabProps}
    >
      {label}
      {children}
    </Link>
  );
};
