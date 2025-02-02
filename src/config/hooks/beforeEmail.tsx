import crypto from "crypto";
import type { BeforeEmail } from "@payloadcms/plugin-form-builder/types";
import { FormSubmission } from "@/types/payload";
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

  const submissionData = data?.submissionData;
  const email = submissionData?.find((field) => field.field === "email")?.value;

  if (email) {
    const subscribersData = await payload.find({
      collection: "subscribers",
      where: {
        email: {
          equals: email,
        },
      },
    });

    const newsletterField = submissionData?.find(
      (field) => field.field === "newsletter",
    );

    if (!newsletterField && subscribersData.totalDocs > 0) {
      return [];
    }
  }

  return emailsToSend.map((item) => {
    let htmlTemplate = item.html;

    htmlTemplate = htmlTemplate.replace(
      "unsubscribe_url",
      `<a href="${getServerSideURL()}/en/unsubscribe?ut=${token}" target="_blank" rel="noopener noreferrer">unsubscribe</a>`,
    );

    return {
      ...item,
      html: htmlTemplate,
    };
  });
};
