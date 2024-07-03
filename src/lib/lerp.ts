/**
 * Linearly interpolates between two values.
 *
 * @param start - The starting value.
 * @param end - The ending value.
 * @param ratio - The interpolation factor, ranging from 0 to 1.
 * @returns The interpolated value.
 */
export const lerp = (start: number, end: number, ratio: number) =>
  start * (1 - ratio) + end * ratio;
