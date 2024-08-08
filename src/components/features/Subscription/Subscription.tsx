import { Container, Title, Text, Box } from "@mantine/core";
import { SubscriptionForm } from "@/components/forms/SubscriptionForm";

export const Subscription = () => {
  return (
    <Container component="section">
      <Box className="bg-appLightColorBeige py-14 px-4">
        <Title order={3} className="">
          Sign up now and ensure you catch every post
        </Title>
        <Text>
          Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </Text>
        <SubscriptionForm />
      </Box>
    </Container>
  );
};
