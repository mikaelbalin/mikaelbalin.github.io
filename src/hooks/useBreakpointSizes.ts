import { useMemo } from "react";
import { getCssVariable } from "#lib/getCssVariable";
import { useRootFontSize } from "#hooks/useRootFontSize";

// Default breakpoint values that match your CSS variables
// These will be used for SSR to avoid hydration mismatch
const DEFAULT_BREAKPOINTS = {
  xs: "36rem",
  sm: "48rem",
  md: "62rem",
  lg: "75rem",
  xl: "88rem",
};

/**
 * Hook that returns formatted breakpoint sizes string for Next.js Image component
 *
 * @param customSizes Optional custom sizes string to override default breakpoints
 * @returns Formatted sizes attribute string (e.g. "(max-width: 36rem) 576px, (max-width: 48rem) 768px, 100vw")
 */
export function useBreakpointSizes(customSizes?: string): string {
  const rootFontSize = useRootFontSize();

  return useMemo(() => {
    if (customSizes) return customSizes;

    // Get breakpoint values - use defaults for SSR
    const breakpoints =
      typeof window === "undefined"
        ? DEFAULT_BREAKPOINTS
        : {
            xs: getCssVariable("--breakpoint-xs") || DEFAULT_BREAKPOINTS.xs,
            sm: getCssVariable("--breakpoint-sm") || DEFAULT_BREAKPOINTS.sm,
            md: getCssVariable("--breakpoint-md") || DEFAULT_BREAKPOINTS.md,
            lg: getCssVariable("--breakpoint-lg") || DEFAULT_BREAKPOINTS.lg,
            xl: getCssVariable("--breakpoint-xl") || DEFAULT_BREAKPOINTS.xl,
          };

    // Format breakpoints into sizes string consistently for both server and client
    const sizesArray = Object.entries(breakpoints).map(([, value]) => {
      // Remove "rem" and convert to number
      const numericValue = parseFloat(value.replace("rem", ""));
      // Calculate pixel value (for the image width at this breakpoint)
      const pixelValue = Math.round(numericValue * rootFontSize);

      return `(max-width: ${value}) ${pixelValue}px`;
    });

    // Add default case for larger viewports
    return sizesArray.join(", ") + ", 100vw";
  }, [customSizes, rootFontSize]);
}
