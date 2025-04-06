/**
 * Filters out numbers from an array that may contain both numbers and objects of type T.
 *
 * This utility function is useful when working with Payload CMS relations that might
 * return an array of IDs (numbers) or populated relation objects.
 *
 * @example
 * // Returns only the populated relation objects
 * const posts = filterPayloadRelations(page.relatedPosts);
 */
export function filterPayloadRelations<T>(items: (number | T)[]): T[] {
  return items.filter((item): item is T => typeof item !== "number");
}
