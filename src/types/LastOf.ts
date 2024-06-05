import { UnionToIntersection } from "./UnionToIntersection";

/**
 * Returns the last element type of a tuple or array type.
 *
 * @template T - The tuple or array type.
 * @returns The last element type of the given tuple or array type.
 *
 * @example
 * type Tuple = [1, 2, 3];
 * type Result = LastOf<Tuple>; // expected to be 3
 */
export type LastOf<T> = UnionToIntersection<
  T extends unknown ? () => T : never
> extends () => infer R
  ? R
  : never;
