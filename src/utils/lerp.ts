/**
 * Linearly interpolates between two values.
 *
 * @param start - The starting value.
 * @param end - The ending value.
 * @param t - The interpolation factor, ranging from 0 to 1.
 * @returns The interpolated value.
 */
export const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;
