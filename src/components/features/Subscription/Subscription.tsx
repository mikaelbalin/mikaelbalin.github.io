import { Container, Title, Text, Box, SimpleGrid } from "@mantine/core";
import { SubscriptionForm } from "@/components/forms/SubscriptionForm";

export const Subscription = () => {
  return (
    <Container component="section">
      <Box className="bg-appLightColorBeige py-14 px-4">
        <SimpleGrid cols={{ base: 1, sm: 2 }} className="sm:gap-20">
          <div>
            <Title order={3}>Sign up now and ensure you catch every post</Title>
          </div>
          <div>
            <Text>
              Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </Text>
          </div>
        </SimpleGrid>

        <SubscriptionForm />
      </Box>
    </Container>
  );
};
