import type { BeforeEmail } from "@payloadcms/plugin-form-builder/types";
import { FormSubmission } from "@/types/payload";
import crypto from "crypto";
import { getServerSideURL } from "@/utilities/getURL";

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

  return emailsToSend.map((item) => {
    let htmlTemplate = item.html;

    htmlTemplate = htmlTemplate.replace("{{url}}", getServerSideURL());
    htmlTemplate = htmlTemplate.replace("{{token}}", `token`);

    return {
      ...item,
      html: htmlTemplate,
    };
  });
};
