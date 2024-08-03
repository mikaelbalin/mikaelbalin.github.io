import { HeroBackground } from "@/components/features/Hero/Background";
import { Box, Container, Title } from "@mantine/core";
import classes from "./HeroBlog.module.css";

export const Hero = () => {
  return (
    <HeroBackground variant="blog">
      <Box className="relative mt-15 pt-6 pb-16">
        <Container>
          <Title className={classes.title}>Blog</Title>
        </Container>
      </Box>
    </HeroBackground>
  );
};
