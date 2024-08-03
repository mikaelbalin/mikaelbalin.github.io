import { HeroBackground } from "@/components/features/Hero/HeroBackground";
import { LiveTime } from "@/components/ui/LiveTime";
import { Marquee } from "@/components/ui/Marquee";
import { HeroProps } from "@/types/data";
import { Box, Button, Container, SimpleGrid, Text } from "@mantine/core";

export const HeroMain = (props: Readonly<HeroProps>) => {
  const { heading, description, link, location } = props;

  return (
    <HeroBackground>
      <Box className="my-auto pt-15">
        <Marquee texts={heading} />
        <Container mt={25}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Text pos="relative">{description}</Text>
          </SimpleGrid>
          <Button component="a" className="mt-7" href={link?.url}>
            {link?.text}
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
