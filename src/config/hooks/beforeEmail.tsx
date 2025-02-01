import type { BeforeEmail } from "@payloadcms/plugin-form-builder/types";
import { FormSubmission } from "@/types/payload";
import { render } from "@react-email/render";
import SubscriptionEmail from "../../../emails/subscription";
import crypto from "crypto";

export const beforeEmail: BeforeEmail<FormSubmission> = async (
  emailsToSend,
  beforeChangeParams,
) => {
  const {
    req: { context, payload },
    data,
  } = beforeChangeParams;

  const token = crypto.randomBytes(150).toString("hex");
  context.token = token;

  const email = data?.submissionData?.find(
    (field) => field.field === "email",
  )?.value;

  if (email) {
    const existingSubscriber = await payload.find({
      collection: "subscribers",
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (existingSubscriber.totalDocs > 0) {
      return [];
    }
  }

  const html = await render(<SubscriptionEmail token={token} />);
  console.log({ emailsToSend, beforeChangeParams });
  return emailsToSend.map((item) => ({
    ...item,
    html,
  }));
};
