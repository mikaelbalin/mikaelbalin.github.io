import { StrapiErrorsProps } from "@/components/ui/StrapiErrors";
import { subscriptionSchema, SubscriptionSchema } from "@/lib/schemas";
import { subscribeService } from "../services/subscription-service";

export async function subscribeAction(data: SubscriptionSchema): Promise<
  | (SubscriptionSchema & {
      errors?: {
        email?: string[];
      };
      message: string;
      strapiError?: StrapiErrorsProps;
    })
  | undefined
> {
  const validatedFields = subscriptionSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      ...data,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid form data",
    };
  }

  const responseData = await subscribeService(validatedFields.data);

  if (!responseData) {
    return {
      ...data,
      message: "An error occurred while subscribing the user",
    };
  }

  if (responseData.error) {
    return {
      ...data,
      strapiError: responseData.error,
      message: "Subscription failed",
    };
  }

  if (responseData?.data?.email) {
    return {
      email: responseData.data.email,
      message:
        "You have successfully subscribed to my newsletter. Please check your email to confirm your subscription.",
    };
  }
}
