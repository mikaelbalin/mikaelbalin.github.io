export const hasSlug = (doc: {
  id: number;
  slug?: string | null | undefined;
}): doc is {
  id: number;
  slug: string;
} => Boolean(doc.slug);
