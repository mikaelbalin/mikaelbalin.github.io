import { CollectionBeforeChangeHook } from "payload";
import { FormSubmission } from "#types/payload";

export const handleSubscriber: CollectionBeforeChangeHook<
  FormSubmission
> = async ({ data, req: { payload, context } }) => {
  const { token } = context;
  const submissionData = data?.submissionData;

  const email = submissionData?.find((field) => field.field === "email")?.value;
  const newsletterField = submissionData?.find(
    (field) => field.field === "newsletter",
  );
  const shouldSubscribe = !newsletterField || newsletterField.value;

  if (!token || typeof token !== "string" || !email || !shouldSubscribe) {
    return data;
  }

  const subscribersData = await payload.find({
    collection: "subscribers",
    where: {
      email: {
        equals: email,
      },
    },
  });
  const subscriber = subscribersData.docs[0];

  if (subscribersData.totalDocs > 0) {
    if (!subscriber.subscribed) {
      await payload.update({
        collection: "subscribers",
        id: subscriber.id,
        data: { subscribed: true },
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

  return data;
};
