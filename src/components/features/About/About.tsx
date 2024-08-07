import { Container, Title, Text } from "@mantine/core";
import { AboutProps } from "../../../types/data";

export const About = (props: AboutProps) => {
  const { heading, text } = props;

  return (
    <Container component="section" className="pt-25 pb-16">
      <Title order={2}>{heading}</Title>
      <Text className="mt-8">{text}</Text>
    </Container>
  );
};
