import crypto from "node:crypto";
import type { CollectionBeforeChangeHook } from "payload";
import type { FormSubmission } from "#types/payload";

export const handleSubscriber: CollectionBeforeChangeHook<
  FormSubmission
> = async ({ data, req: { payload, context } }) => {
  const submissionData = data?.submissionData;

  const email = submissionData?.find((field) => field.field === "email")?.value;
  const newsletterField = submissionData?.find(
    (field) => field.field === "newsletter",
  );
  const shouldSubscribe = !newsletterField || newsletterField.value;

  if (!email || !shouldSubscribe) {
    return data;
  }

  const token =
    typeof context.token === "string"
      ? context.token
      : crypto.randomBytes(150).toString("hex");
  context.token = token;

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
    context.subscriberExisted = true;
    if (!subscriber.subscribed) {
      await payload.update({
        collection: "subscribers",
        id: subscriber.id,
        data: { subscribed: true },
      });
    }
  } else {
    context.subscriberExisted = false;
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
