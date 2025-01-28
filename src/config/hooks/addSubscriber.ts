import { CollectionAfterChangeHook } from "payload";
import crypto from "crypto";
import { FormSubmission } from "@/types/payload";

export const addSubscriber: CollectionAfterChangeHook<FormSubmission> = async ({
  doc,
  req: { payload },
}) => {
  const email = doc?.submissionData?.find(
    (field) => field.field === "email",
  )?.value;
  console.log("addSubscriber", { doc, email });

  if (email) {
    const token = crypto.randomBytes(20).toString("hex");

    await payload.create({
      collection: "subscribers",
      data: {
        email,
        token,
        subscribed: true,
      },
    });
  }

  return doc;
};
