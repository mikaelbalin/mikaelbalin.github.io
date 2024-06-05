/**
 * Converts a union type to an intersection type.
 *
 * @template U - The union type to convert.
 * @returns The resulting intersection type.
 *
 * @example
 * type Union = "a" | "b" | "c";
 * type Intersection = UnionToIntersection<Union>; // expected to be "a" & "b" & "c"
 */
export type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
