/**
 * Type guard to check if a document has a non-null, non-undefined slug property.
 *
 * @returns A type predicate indicating whether the document has a string slug
 */
export const hasSlug = (doc: {
  id: number;
  slug?: string | null;
}): doc is {
  id: number;
  slug: string;
} => Boolean(doc.slug);
