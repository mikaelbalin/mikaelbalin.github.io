import { Container, Title, Text, Box, Grid, GridCol } from "@mantine/core";
import { SubscriptionForm } from "@/components/forms/SubscriptionForm";
import { SubscriptionProps } from "@/types/data";

export const Subscription = (props: SubscriptionProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, text, id, ...rest } = props;
  return (
    <Container component="section" className="mb-14 sm:mb-24">
      <Box className="bg-appLightColorBeige dark:bg-appDarkColorCoalBlack py-14 px-4 mt-14 sm:py-20 sm:px-12 sm:mt-26">
        <Grid>
          <GridCol span={{ base: 12, sm: 8, lg: 7 }}>
            <Title order={3}>{title}</Title>
          </GridCol>
          <GridCol
            span={{ base: 12, sm: 4 }}
            offset={{ base: 0, lg: 1 }}
            className="flex items-center"
          >
            <Text>{text}</Text>
          </GridCol>
        </Grid>

        <SubscriptionForm {...rest} />
      </Box>
    </Container>
  );
};
