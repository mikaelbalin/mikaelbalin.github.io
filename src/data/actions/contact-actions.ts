import { StrapiErrorsProps } from "@/components/ui/StrapiErrors";
import { ContactFormSchema, contactFormSchema } from "@/lib/schemas";
import { contactService } from "../services/contact-service";
import { subscribeService } from "../services/subscription-service";

export async function contactSubmitAction(data: ContactFormSchema): Promise<
  | (ContactFormSchema & {
      errors?: {
        email?: string[];
      };
      message: string;
      strapiError?: StrapiErrorsProps;
    })
  | undefined
> {
  const validatedFields = contactFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      ...data,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid form data",
    };
  }

  const { subscribeToNewsletter, email, message, name } = validatedFields.data;

  const responseData = await contactService({ email, message, name });

  if (subscribeToNewsletter) {
    await subscribeService({ email });
  }

  console.log({ responseData });

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
      message: "Contact submit failed",
    };
  }

  if (responseData?.data) {
    return undefined;
  }
}
