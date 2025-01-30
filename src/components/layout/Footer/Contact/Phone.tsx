"use client";

import { Text } from "@mantine/core";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { contact } from "./contact";

export const Phone = (props: { phone: string }) => {
  const { phone } = props;

  return (
    <Text
      component="button"
      size="xl"
      onClick={() => contact(phone)}
      className="flex items-center gap-2"
    >
      <IconBrandWhatsapp /> Chat on WhatsApp
    </Text>
  );
};
