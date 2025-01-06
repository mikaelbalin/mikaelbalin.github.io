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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CalloutProps = any;

export const Callout = (props: CalloutProps) => {
  const { type, title, body } = props;
  const Icon = getIcon(type);
  return (
    <div className="mb-6 bg-appLightColorBeige dark:bg-appDarkColorCoalBlack">
      {title && (
        <div className="flex gap-2 items-center bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-base">
          <Icon /> {title}
        </div>
      )}
      <div className="py-6 px-4">
        <Text size="lg">{body}</Text>
      </div>
    </div>
  );
};
