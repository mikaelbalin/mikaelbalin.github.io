import { Title, TitleOrder } from "@mantine/core";
import Link from "next/link";
import { PropsWithChildren } from "react";

export const HeadingRenderer = (
  props: PropsWithChildren<{
    tag: string;
    fragmentID: string;
  }>,
) => {
  const { tag, children, fragmentID } = props;
  const order = parseInt(tag.match(/\d+/)?.[0] || "1", 10);

  return (
    <Title
      id={fragmentID}
      order={order as TitleOrder}
      size={`h${order + 1}`}
      className="group mb-4"
    >
      {children}&nbsp;
      <Link
        href={`#${fragmentID}`}
        aria-label={`Permalink: ${fragmentID}`}
        className="inline-flex opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-[var(--mantine-color-blue-6)]"
      >
        #
      </Link>
    </Title>
  );
};
