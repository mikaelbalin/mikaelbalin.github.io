import crypto from "node:crypto";
import type { BeforeEmail } from "@payloadcms/plugin-form-builder/types";
import { getServerSideURL } from "#lib/getURL";
import type { FormSubmission } from "#types/payload";

export const beforeEmail: BeforeEmail<FormSubmission> = async (
  emailsToSend,
  beforeChangeParams,
) => {
  const {
    req: { context },
    data,
  } = beforeChangeParams;

  const token =
    typeof context.token === "string"
      ? context.token
      : crypto.randomBytes(150).toString("hex");
  context.token = token;

  const submissionData = data?.submissionData;
  const email = submissionData?.find((field) => field.field === "email")?.value;

  if (email) {
    const newsletterField = submissionData?.find(
      (field) => field.field === "newsletter",
    );

    if (!newsletterField && context.subscriberExisted) {
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
