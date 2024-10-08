"use client";

import { HeroBackground } from "@/components/features/Hero/HeroBackground";
import { LiveTime } from "@/components/ui/LiveTime";
import { Marquee } from "@/components/ui/Marquee";
import { HeroProps } from "@/types/data";
import { Box, Button, Container, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export const HeroMain = (props: Readonly<HeroProps>) => {
  const { title, description, location, contactLink } = props;

  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after the component mounts to prevent LiveTime issues.
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <HeroBackground>
      {isClient && (
        <>
          <Box className="my-auto pt-15">
            <Marquee texts={title} />
            <Container className="mt-6.5 sm:mt-8 motion-safe:animate-showWithDelay">
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <Text className="relative" size="lg">
                  {description}
                </Text>
              </SimpleGrid>
              <Button
                component="a"
                className="mt-7 sm:mt-8"
                href={contactLink.url}
              >
                {contactLink.text}
              </Button>
            </Container>
          </Box>

          <Box className="mb-14 motion-safe:animate-showWithDelay">
            <Container className="relative text-right">
              <Text size="lg">{location}</Text>
              <LiveTime />
            </Container>
          </Box>
        </>
      )}
    </HeroBackground>
  );
};
