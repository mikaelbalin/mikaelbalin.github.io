/**
 * Represents a type that appends an element of type `V` to an array of elements of type `T`.
 *
 * @template T - The array of elements.
 * @template V - The type of the element to be appended.
 *
 * @example
 * type Tuple = [1, 2, 3];
 * type Result = Push<Tuple, 4>; // expected to be [1, 2, 3, 4]
 */
export type Push<T extends unknown[], V> = [...T, V];
