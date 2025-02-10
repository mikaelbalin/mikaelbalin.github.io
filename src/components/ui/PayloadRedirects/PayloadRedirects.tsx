import type React from "react";
import type { Redirect } from "@/types/payload";
import { getCachedDocument } from "@/utilities/getDocument";
import { getCachedRedirects } from "@/utilities/getRedirects";
import { notFound, redirect } from "next/navigation";

type Reference = NonNullable<Redirect["to"]>["reference"];

const buildRedirectUrl = (relationTo: string, slug?: string | null): string => {
  const prefix = relationTo !== "pages" ? `/${relationTo}` : "";
  return `${prefix}/${slug}`;
};

const getRedirectUrlFromReference = async (
  reference?: Reference,
): Promise<string | null> => {
  if (!reference?.relationTo) return null;

  if (typeof reference.value === "string") {
    const document = await getCachedDocument(
      reference.relationTo,
      reference.value,
    );

    return buildRedirectUrl(reference.relationTo, document?.slug);
  }

  const slug = typeof reference.value === "object" ? reference.value?.slug : "";
  return buildRedirectUrl(reference.relationTo, slug);
};

interface Props {
  disableNotFound?: boolean;
  path: string;
}

/**
 * Allows redirects for valid pages
 */
export const PayloadRedirects: React.FC<Props> = async ({
  disableNotFound,
  path,
}) => {
  const slug = path.startsWith("/") ? path : `/${path}`;

  const redirects = await getCachedRedirects();

  const redirectItem = redirects.find((redirect) => redirect.from === slug);

  if (!redirectItem) {
    return disableNotFound ? null : notFound();
  }

  if (redirectItem.to?.url) {
    redirect(redirectItem.to.url);
  }

  const redirectUrl = await getRedirectUrlFromReference(
    redirectItem.to?.reference,
  );

  if (redirectUrl) {
    redirect(redirectUrl);
  }
};
