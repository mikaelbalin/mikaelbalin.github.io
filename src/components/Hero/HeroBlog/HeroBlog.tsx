"use client";

import React from "react";
import { MotionProvider } from "#context/motion-context";
import { HeroBackground } from "#components/Hero/HeroBackground";
import { Container } from "#components/Container";
import { Page } from "#types/payload";

export const HeroBlog = ({ title }: Page["hero"]) => {
  return (
    <MotionProvider>
      <HeroBackground variant="blog">
        <div className="relative pt-6 pb-16 sm:pt-24 sm:pb-24">
          <Container>
            <h1 className="text-13xl sm:text-15xl">{title}</h1>
          </Container>
        </div>
      </HeroBackground>
    </MotionProvider>
  );
};
