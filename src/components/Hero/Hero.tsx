import { HeroBackground } from "@/components/HeroBackground";
import { LiveTime } from "@/components/LiveTime";
import { Marquee } from "@/components/Marquee";
import { Box, Button, Container, SimpleGrid, Text } from "@mantine/core";

interface Link {
  url: string;
  text: string;
  isExternal: boolean;
}

interface HeroProps {
  data: {
    heading: string[];
    description: string;
    link: Link;
    location: string;
  };
}

export const Hero = ({ data }: Readonly<HeroProps>) => {
  const { heading, description, link, location } = data;

  return (
    <HeroBackground>
      <Box className="my-auto pt-15">
        <Marquee texts={heading} />
        <Container mt={25}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Text pos="relative">{description}</Text>
          </SimpleGrid>
          <Button component="a" className="mt-7" href={link.url}>
            {link.text}
          </Button>
        </Container>
      </Box>
      <Box className="mb-14">
        <Container className="relative text-right">
          <Text>{location}</Text>
          <LiveTime />
        </Container>
      </Box>
    </HeroBackground>
  );
};
