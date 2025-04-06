import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

/**
 * Returns a CSS color-mix string that applies an alpha transparency to the given color.
 * Uses the color-mix CSS function to create a semi-transparent version of the color.
 *
 * @param color - The base CSS color value (e.g., 'red', '#ff0000', 'rgb(255, 0, 0)')
 * @param alpha - The alpha value between 0 and 1, where 0 is completely transparent and 1 is completely opaque
 * @returns A CSS color-mix string representing the color with the specified alpha transparency
 *
 * @example
 * // Returns "color-mix(in srgb, #ff0000, transparent 50%)"
 * alpha('#ff0000', 0.5)
 */
export function alpha(color: string, alpha: number) {
  const mixPercentage = (1 - alpha) * 100;
  return `color-mix(in srgb, ${color}, transparent ${mixPercentage}%)`;
}
