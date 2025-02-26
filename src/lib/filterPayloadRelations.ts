export function filterPayloadRelations<T>(items: (number | T)[]): T[] {
  return items.filter((item): item is T => typeof item !== "number");
}
