import { Container } from "#components/Container";
import { Text } from "#components/ui/Text";
import { ReusableBlock } from "#types/payload";
import { SubscriptionForm } from "#components/forms/SubscriptionForm";

export const Subscription = (props: ReusableBlock) => {
  const { block } = props;

  if (!block || typeof block === "number" || block.blockType.length === 0) {
    return null;
  }

  const { title, text, form } = block.blockType[0];

  return (
    <Container id="subscription" className="mb-14 sm:mb-24">
      <section className="mt-14 flex flex-col gap-8 bg-warm-porcelain px-4 py-14 sm:mt-26 sm:gap-14 sm:px-12 sm:py-20 dark:bg-shadow-earth">
        <div className="grid gap-4 sm:grid-cols-2 sm:items-end sm:gap-14">
          <h2 className="text-4xl font-bold sm:text-10xl">{title} &#128126;</h2>
          <Text size="lg">{text}</Text>
        </div>
        {Array.isArray(form) && form.length > 0 && (
          <SubscriptionForm {...form[0]} />
        )}
      </section>
    </Container>
  );
};
