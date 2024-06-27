import { HeroBackground } from "@/components/HeroBackground";
import { LiveTime } from "@/components/LiveTime";
import { Marquee } from "@/components/Marquee";
import { Box, Button, Container, SimpleGrid, Text } from "@mantine/core";

interface HeroProps {
  title: string[];
  description: string;
}

export const Hero = ({ title = [], description }: HeroProps) => {
  return (
    <HeroBackground>
      <Box className="my-auto pt-15">
        <Marquee texts={title} />
        <Container mt={25}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Text pos="relative">{description}</Text>
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
