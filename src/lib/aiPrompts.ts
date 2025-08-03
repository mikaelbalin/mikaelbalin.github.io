/**
 * Creates a compelling SEO meta description prompt.
 *
 * @param textContent - The article content to analyze
 * @param maxLength - Maximum character length for the description (default: 150)
 * @returns Formatted prompt for AI model
 */
export function createSeoDescriptionPrompt(
  textContent: string,
  maxLength: number = 150,
): string {
  return `Create a compelling SEO meta description (100-${maxLength} characters) for the following article content. The description should:
- Summarize the main topic and key points
- Be engaging for search engine users
- Include relevant keywords naturally
- Stay within 100-${maxLength} characters

Article content:
${textContent.slice(0, 2000)}`;
}
