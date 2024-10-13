"use client";

import { Container, Title, Text, Grid, GridCol } from "@mantine/core";
import { AboutProps } from "@/types/data";
import { motion } from "framer-motion";

export const About = (props: AboutProps) => {
  const { title, description } = props;

  return (
    <Container
      className="pt-26 pb-16 sm:pt-34 sm:pb-24"
      renderRoot={(props) => (
        <motion.div
          {...props}
          initial={{
            opacity: 0,
            y: "50%",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 1,
            },
          }}
          viewport={{ once: true }}
        />
      )}
    >
      <Title order={2} className="mb-8">
        {title}
      </Title>
      <Grid>
        <GridCol span={{ base: 12, sm: 6 }} offset={{ sm: 6 }}>
          <Text size="lg">{description}</Text>
        </GridCol>
      </Grid>
    </Container>
  );
};
