"use client";

import { HeroBackground } from "@/components/features/Hero/HeroBackground";
import { LiveTime } from "@/components/ui/LiveTime";
import { Marquee } from "@/components/ui/Marquee";
import { HeroProps } from "@/types/data";
import { Box, Button, Container, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
  SpringOptions,
} from "framer-motion";
import { MotionProvider, useMotionContext } from "@/context/motion-context";

const springConfig: SpringOptions = { stiffness: 100, damping: 30 };

type HeroDescriptionProps = Pick<
  HeroProps,
  "title" | "description" | "contactLink"
>;

const HeroDescription = (props: HeroDescriptionProps) => {
  const { title, description, contactLink } = props;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "start end"],
  });
  const y = useParallax(scrollYProgress, -320);
  const ySpring = useSpring(y, springConfig);

  const { y: yRef } = useMotionContext(); // Access the motion value ref
  yRef.current = ySpring; // Set the motion value

  return (
    <Box className="my-auto" ref={ref}>
      <Marquee texts={title} />
      <Container className="mt-6.5 sm:mt-8 motion-safe:animate-showWithDelay">
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <Text className="relative" size="lg">
            {description}
          </Text>
        </SimpleGrid>
        <Button component="a" className="mt-7 sm:mt-8" href={contactLink.url}>
          {contactLink.text}
        </Button>
      </Container>
    </Box>
  );
};

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export const HeroMain = (props: Readonly<HeroProps>) => {
  const { title, description, location, contactLink } = props;

  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after the component mounts to prevent LiveTime issues.
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <MotionProvider>
      <HeroBackground>
        {isClient && (
          <>
            <HeroDescription
              title={title}
              description={description}
              contactLink={contactLink}
            />

            <Box className="mb-14 motion-safe:animate-showWithDelay">
              <Container className="relative text-right">
                <Text size="lg">{location}</Text>
                <LiveTime />
              </Container>
            </Box>
          </>
        )}
      </HeroBackground>
    </MotionProvider>
  );
};
