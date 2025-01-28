import type { BeforeEmail } from "@payloadcms/plugin-form-builder/types";
import { FormSubmission } from "@/types/payload";
// import { render } from "@react-email/render";
// import SubscriptionEmail from "../../../emails/subscription";

export const beforeEmail: BeforeEmail<FormSubmission> = async (
  emailsToSend,
  // beforeChangeParams,
) => {
  // modify the emails in any way before they are sent
  // const { data } = beforeChangeParams;

  // console.log("beforeEmail", {
  //   emailsToSend,
  //   submissionData: data.submissionData,
  //   html: await render(<SubscriptionEmail />),
  // });

  return emailsToSend.map((email) => ({
    ...email,
    html: email.html, // transform the html in any way you'd like (maybe wrap it in an html template?)
  }));
};
