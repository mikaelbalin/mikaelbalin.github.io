import { HeroBackground } from "@/components/features/Hero/HeroBackground";
import { Box, Container, Title } from "@mantine/core";
import classes from "./HeroBlog.module.css";

export const HeroBlog = () => {
  return (
    <HeroBackground variant="blog">
      <Box className="relative mt-15 pt-6 pb-16 sm:pt-24 sm:pb-24">
        <Container>
          <Title>Blog</Title>
        </Container>
      </Box>
    </HeroBackground>
  );
};
