import { CollectionBeforeChangeHook } from "payload";

import { FormSubmission } from "@/types/payload";

export const addSubscriber: CollectionBeforeChangeHook<
  FormSubmission
> = async ({ data, req: { payload, context } }) => {
  const { token } = context;
  const email = data?.submissionData?.find(
    (field) => field.field === "email",
  )?.value;

  if (email && token && typeof token === "string") {
    await payload.create({
      collection: "subscribers",
      data: {
        email,
        token,
        subscribed: true,
      },
    });
  }

  return data;
};
