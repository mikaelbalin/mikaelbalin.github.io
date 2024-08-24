import { Container, Title, Text, Grid, GridCol } from "@mantine/core";
import { AboutProps } from "@/types/data";

export const About = (props: AboutProps) => {
  const { heading, text } = props;

  return (
    <Container component="section" className="pt-26 pb-16">
      <Title order={2} className="mb-8">
        {heading}
      </Title>
      <Grid>
        <GridCol span={{ base: 12, sm: 6 }} offset={{ sm: 6 }}>
          <Text size="lg">{text}</Text>
        </GridCol>
      </Grid>
    </Container>
  );
};
