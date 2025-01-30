import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Tailwind,
} from "@react-email/components";
import config from "./tailwind.config";
import { getClientSideURL } from "@/utilities/getURL";

type SubscriptionEmailProps = Readonly<{
  token: string;
}>;

const SubscriptionEmail = ({ token }: SubscriptionEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <meta name="color-scheme" content="light only"></meta>
    </Head>
    <Preview>Thank you for subscribtion!</Preview>
    <Tailwind
      config={{
        ...config,
      }}
    >
      <Body className="bg-white text-black font-sans">
        <Container className="p-2">
          <Heading>Olá 👋</Heading>
          <Text>
            Thank you for subscribing to my programming blog! You’re now part of
            a community that stays updated with the latest in programming tips,
            tutorials, and industry insights. As a subscriber, you’ll receive
            regular updates on my newest posts, special content and
            announcements about upcoming events, webinars, and new features.
          </Text>
          <Text>
            If you ever wish to unsubscribe, simply click{" "}
            <Link
              href={`${getClientSideURL()}/unsubscribe?ut=${token}`}
              target="_blank"
            >
              unsubscribe link
            </Link>
            .
          </Text>
          <Text>
            I&apos;m excited to have you with me and hope our content brings
            value to your programming journey!
          </Text>
          <Text>
            Best regards,
            <br />
            Mikael Balin
            <br />
            <Link href="https://mikaelbalin.com" target="_blank">
              mikaelbalin.com
            </Link>
          </Text>
          <Text>
            Please do not reply to this email. If you have any questions,
            contact me at{" "}
            <Link href="mailto:hello@mikaelbalin.com">
              hello@mikaelbalin.com
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

SubscriptionEmail.PreviewProps = {
  token: "sparo-ndigo-amurt-secan",
} satisfies SubscriptionEmailProps;

export default SubscriptionEmail;
