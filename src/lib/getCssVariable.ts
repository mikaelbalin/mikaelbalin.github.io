/**
 * Gets a CSS variable value from the root element
 *
 * @param variableName The CSS variable name (without the -- prefix)
 * @param fallback Optional fallback value if the variable is not found
 * @returns The CSS variable value or fallback
 */
export function getCssVariable(
  variableName: string,
  fallback?: string,
): string {
  const rootStyle = window.getComputedStyle(document.documentElement);
  return rootStyle.getPropertyValue(variableName).trim() || fallback || "";
}
