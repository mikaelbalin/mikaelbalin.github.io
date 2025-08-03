import { createGoogleGenerativeAI } from "@ai-sdk/google";

/**
 * Google Generative AI provider instance.
 * Configured with API key from environment variables.
 */
export const googleAI = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

/**
 * Default Google AI model for text generation tasks.
 */
export const defaultModel = googleAI("gemini-2.5-flash");
