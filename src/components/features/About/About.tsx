"use client";

import { Container, Title, Text, Grid, GridCol } from "@mantine/core";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { AboutBlock as AboutBlockProps } from "@/types/payload";

const splitText = (text: string) => {
  return text.split("").map((char, index) => {
    const shouldAnimate = Math.random() > 0.8;

    if (shouldAnimate) {
      return (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: index * 0.005 }}
          viewport={{ once: true }}
        >
          {char}
        </motion.span>
      );
    } else {
      return <span key={index}>{char}</span>;
    }
  });
};

export const About = (props: AboutBlockProps) => {
  const { title, description } = props;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Container id="about" className="pt-26 pb-16 sm:pt-34 sm:pb-24">
      <motion.div
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
      >
        <Title order={2} className="mb-8">
          {isClient ? splitText(title) : title}
        </Title>
        <Grid>
          <GridCol span={{ base: 12, sm: 6 }} offset={{ sm: 6 }}>
            <Text size="lg">
              {isClient ? splitText(description) : description}
            </Text>
          </GridCol>
        </Grid>
      </motion.div>
    </Container>
  );
};
