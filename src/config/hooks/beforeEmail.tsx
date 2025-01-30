import type { BeforeEmail } from "@payloadcms/plugin-form-builder/types";
import { FormSubmission } from "@/types/payload";
import { render } from "@react-email/render";
import SubscriptionEmail from "../../../emails/subscription";
import crypto from "crypto";

export const beforeEmail: BeforeEmail<FormSubmission> = async (
  emailsToSend,
  beforeChangeParams,
) => {
  // modify the emails in any way before they are sent
  const {
    req: { context },
  } = beforeChangeParams;

  const token = crypto.randomBytes(150).toString("hex");
  context.token = token;

  const html = await render(<SubscriptionEmail token={token} />);

  return emailsToSend.map((email) => ({
    ...email,
    html, // transform the html in any way you'd like (maybe wrap it in an html template?)
  }));
};
