import { Container, Title, Text } from "@mantine/core";

export const About = () => {
  return (
    <Container component="section" pt={104} pb={64}>
      <Title order={2}>
        Striving for excellence in every line of code, down to the last pixel.
      </Title>
      <Text mt={32}>
        Hi. I’m a software engineer with more than 5 years of experience, and I
        create fun, innovative, accessible, and fast apps and websites. I try to
        leave every bit of code I touch more readable, modular, performant, and
        accessible UI adjusted.
      </Text>
    </Container>
  );
};
