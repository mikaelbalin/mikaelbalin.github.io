import { Box, Container, Title } from "@mantine/core";
import { HeroBackground } from "../HeroBackground";
import classes from "./HeroBlog.module.css";

export const HeroBlog = () => {
  return (
    <HeroBackground variant="secondary">
      <Box className="relative mt-15 pt-6 pb-16">
        <Container>
          <Title className={classes.title}>Blog</Title>
        </Container>
      </Box>
    </HeroBackground>
  );
};