"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { AboutBlock as AboutBlockProps } from "#types/payload";
import { Container } from "#components/Container";
import { Title } from "#components/ui/Title";
import { Text } from "#components/ui/Text";

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
        <div className="sm:grid sm:grid-cols-2 sm:gap-4">
          <div className="sm:col-start-2 sm:col-end-3">
            <Text size="lg">
              {isClient ? splitText(description) : description}
            </Text>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};
