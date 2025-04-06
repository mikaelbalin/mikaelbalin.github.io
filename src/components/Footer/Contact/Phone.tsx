"use client";

import { redirectToWhatsApp } from "#lib/redirectToWhatsApp";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { UnstyledButton } from "#components/ui/UnstyledButton";

export const Phone = (props: { phone: string }) => {
  const { phone } = props;

  return (
    <UnstyledButton
      onClick={() => redirectToWhatsApp(phone)}
      className="flex items-center gap-2 text-xl sm:text-3xl"
    >
      <IconBrandWhatsapp /> Chat on WhatsApp
    </UnstyledButton>
  );
};
