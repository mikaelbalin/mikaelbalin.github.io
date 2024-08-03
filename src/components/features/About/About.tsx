import { Container, Title, Text } from "@mantine/core";
import { AboutProps } from "../../../types/data";

export const About = (props: AboutProps) => {
  const { heading, text } = props;

  return (
    <Container component="section" pt={104} pb={64}>
      <Title order={2}>{heading}</Title>
      <Text mt={32}>{text}</Text>
    </Container>
  );
};
