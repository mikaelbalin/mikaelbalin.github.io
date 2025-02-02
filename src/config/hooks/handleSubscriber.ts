import { CollectionBeforeChangeHook } from "payload";

import { FormSubmission } from "@/types/payload";

export const handleSubscriber: CollectionBeforeChangeHook<
  FormSubmission
> = async ({ data, req: { payload, context } }) => {
  const { token } = context;
  const submissionData = data?.submissionData;

  const email = submissionData?.find((field) => field.field === "email")?.value;

  const newsletterField = submissionData?.find(
    (field) => field.field === "newsletter",
  );

  if (token && typeof token === "string" && email) {
    const subscribersData = await payload.find({
      collection: "subscribers",
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (subscribersData.totalDocs > 0) {
      if (!newsletterField || newsletterField.value) {
        await payload.update({
          collection: "subscribers",
          id: subscribersData.docs[0].id,
          data: {
            subscribed: true,
          },
        });
      }
    } else {
      await payload.create({
        collection: "subscribers",
        data: {
          email,
          token,
          subscribed: true,
        },
      });
    }
  }

  return data;
};
