import { Ollama } from "ollama";

/**
 * Ollama Cloud client instance.
 * Configured with the API key from environment variables.
 */
export const ollama = new Ollama({
  host: "https://ollama.com",
  headers: {
    Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
  },
});

/**
 * Default Ollama Cloud model for text generation tasks.
 */
export const defaultModel = "deepseek-v4-flash";
