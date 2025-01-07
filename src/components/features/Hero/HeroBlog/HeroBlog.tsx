"use client";

import React from "react";
import { HeroBackground } from "@/components/features/Hero/HeroBackground";
import { Box, Container, Title } from "@mantine/core";
import { MotionProvider } from "@/context/motion-context";
import { Page } from "@/types/payload";

export const HeroBlog: React.FC<Page["hero"]> = ({ title }) => {
  return (
    <MotionProvider>
      <HeroBackground variant="blog">
        <Box className="relative pt-6 pb-16 sm:pt-24 sm:pb-24">
          <Container>
            <Title>{title}</Title>
          </Container>
        </Box>
      </HeroBackground>
    </MotionProvider>
  );
};
