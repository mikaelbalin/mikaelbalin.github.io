import { ContactFormSchema } from "@/lib/schemas";
import { getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

export async function contactService(
  data: Omit<ContactFormSchema, "termsOfService" | "subscribeToNewsletter">,
): Promise<
  | {
      data?: {
        id: number;
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      };
      error?: {
        status: number | null;
        name: string;
        message: string | null;
      };
      meta?: object;
    }
  | undefined
> {
  const url = new URL("/api/contact-forms", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
      // cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Contact Service Error:", error);
  }
}
