import { Box, Container, Title } from "@mantine/core";
import { HeroBackground } from "../HeroBackground";
import classes from "./HeroBlog.module.css";

export const HeroBlog = () => {
  return (
    <HeroBackground>
      <Box pos="relative" pt={60}>
        <Container>
          <Title className={classes.title}>Blog</Title>
        </Container>
      </Box>
    </HeroBackground>
  );
};
