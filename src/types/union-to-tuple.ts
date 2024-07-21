import { LastOf } from "./last-of";
import { Push } from "./push";

/**
 * Converts a union type to a tuple type.
 *
 * @template T - The union type to convert.
 * @template L - The last element of the union type.
 * @returns A tuple type representing the union type.
 *
 * @example
 * type Union = "a" | "b" | "c";
 * type Tuple = UnionToTuple<Union>; // expected to be ["a", "b", "c"]
 */
export type UnionToTuple<T, L = LastOf<T>> = [T] extends [never]
  ? []
  : Push<UnionToTuple<Exclude<T, L>>, L>;
