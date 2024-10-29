import { SubscriptionSchema } from "@/lib/schemas";
import { getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

export async function subscribeService(data: SubscriptionSchema): Promise<
  | {
      data?: {
        id: number;
        documentId: string;
        email: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      };
      error?: {
        status: number | null;
        name: string;
        message: string | null;
      };
      meta?: {};
    }
  | undefined
> {
  const url = new URL("/api/subscribers", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Subscription Service Error:", error);
  }
}
