"use client";

import { HeroBackground } from "@/components/features/Hero/HeroBackground";
import { Box, Container, Title } from "@mantine/core";
import { MotionProvider } from "@/context/motion-context";

export const HeroBlog = () => {
  return (
    <MotionProvider>
      <HeroBackground variant="blog">
        <Box className="relative pt-6 pb-16 sm:pt-24 sm:pb-24">
          <Container>
            <Title>Blog</Title>
          </Container>
        </Box>
      </HeroBackground>
    </MotionProvider>
  );
};
