"use client";

import { redirectToWhatsApp } from "@/utilities/redirectToWhatsApp";
import { Text } from "@mantine/core";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export const Phone = (props: { phone: string }) => {
  const { phone } = props;

  return (
    <Text
      component="button"
      size="xl"
      onClick={() => redirectToWhatsApp(phone)}
      className="flex items-center gap-2"
    >
      <IconBrandWhatsapp /> Chat on WhatsApp
    </Text>
  );
};
