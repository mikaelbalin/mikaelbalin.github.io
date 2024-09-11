import { Text } from "@mantine/core";
import {
  IconInfoCircle,
  IconBulb,
  IconExclamationCircle,
} from "@tabler/icons-react";

function getIcon(type: "note" | "tip" | "important") {
  switch (type) {
    case "note":
      return IconInfoCircle;
    case "tip":
      return IconBulb;
    case "important":
      return IconExclamationCircle;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}

interface AdmonitionProps {
  block: {
    id: number;
    type: "note" | "tip" | "important";
    title: string;
    body?: string;
  };
}

export default function Admonition({ block }: AdmonitionProps) {
  const { type, title, body } = block;
  const Icon = getIcon(type);
  return (
    <div className="mb-6 bg-appLightColorBeige">
      <div className="flex gap-2 items-center bg-black text-white px-4 py-2 text-base">
        <Icon /> {title}
      </div>
      <div className="py-6 px-4">
        <Text size="lg">{body}</Text>
      </div>
    </div>
  );
}
