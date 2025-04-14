import { Page } from "#types/payload";
import { Container } from "#components/Container";

export const HeroSimple = ({ title }: Page["hero"]) => {
  return (
    <Container className="sm:mt-19.5 mt-16 pb-16 pt-6 sm:pb-24 sm:pt-24">
      <h1 className="sm:text-12xl text-8xl font-bold">{title}</h1>
    </Container>
  );
};
