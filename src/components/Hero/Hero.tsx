import { HeroBackground } from "../HeroBackground";
import classes from "./Hero.module.css";
import { Marquee } from "../Marquee";
import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { LiveTime } from "../LiveTime";

export const Hero = () => {
  const greetings = ["Hello", "Olá", "Hallå", "Bonjour"];

  return (
    <Stack
      component="section"
      justify="center"
      gap={0}
      className={classes.root}
    >
      <HeroBackground />
      <Box mt="auto" mb="auto">
        <Marquee texts={greetings} />
        <Container mt={25}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Text pos="relative">
              Experienced software engineer who finds joy in development and
              sharing insights with others.
            </Text>
          </SimpleGrid>
          <Button mt={rem(28)}>Let’s get in touch</Button>
        </Container>
      </Box>
      <Box mb={56}>
        <Container className={classes.location}>
          <Text>Based in Portugal</Text>
          <LiveTime />
        </Container>
      </Box>
    </Stack>
  );
};
