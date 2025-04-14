import { Page } from "#types/payload";
import { Container } from "#components/Container";

export const HeroSimple = ({ title }: Page["hero"]) => {
  return (
    <div className="relative pb-16 pt-6 sm:pb-24 sm:pt-24">
      <Container>
        <h1 className="text-13xl sm:text-15xl">{title}</h1>
      </Container>
    </div>
  );
};
