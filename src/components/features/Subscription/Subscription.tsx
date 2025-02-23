import { Container, Title, Text, Box, Grid, GridCol } from "@mantine/core";
import { SubscriptionForm } from "@/components/forms/SubscriptionForm";
import { ReusableBlock } from "@/types/payload";

export const Subscription = (props: ReusableBlock) => {
  const { block } = props;

  if (!block || typeof block === "number" || block.blockType.length === 0) {
    return null;
  }

  const { title, text, form } = block.blockType[0];

  return (
    <Container id="subscription" component="section" className="mb-14 sm:mb-24">
      <Box className="bg-appLightColorBeige dark:bg-appDarkColorCoalBlack py-14 px-4 mt-14 sm:py-20 sm:px-12 sm:mt-26">
        <Grid>
          <GridCol span={{ base: 12, sm: 8, lg: 7 }}>
            <Title order={3}>{title} &#128126;</Title>
          </GridCol>
          <GridCol
            span={{ base: 12, sm: 4 }}
            offset={{ base: 0, lg: 1 }}
            className="flex items-center"
          >
            <Text>{text}</Text>
          </GridCol>
        </Grid>
        {Array.isArray(form) && form.length > 0 && (
          <SubscriptionForm {...form[0]} />
        )}
      </Box>
    </Container>
  );
};
