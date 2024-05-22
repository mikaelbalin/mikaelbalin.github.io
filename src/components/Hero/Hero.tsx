import { Box, Button, Container, SimpleGrid, Text } from "@mantine/core";
import { HeroBackground } from "../HeroBackground";
import { Marquee } from "../Marquee";
import { LiveTime } from "../LiveTime";

export const Hero = () => {
  const greetings = ["Hello", "Olá", "Hallå", "Bonjour"];

  return (
    <HeroBackground>
      <Box className="my-auto pt-15">
        <Marquee texts={greetings} />
        <Container mt={25}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Text pos="relative">
              Experienced software engineer who finds joy in development and
              sharing insights with others.
            </Text>
          </SimpleGrid>
          <Button className="mt-7">Let’s get in touch</Button>
        </Container>
      </Box>
      <Box className="mb-14">
        <Container className="relative text-right">
          <Text>Based in Portugal</Text>
          <LiveTime />
        </Container>
      </Box>
    </HeroBackground>
  );
};
