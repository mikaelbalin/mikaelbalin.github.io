import {
  IconInfoCircle,
  IconBulb,
  IconExclamationCircle,
} from "@tabler/icons-react";
import type { CalloutBlock } from "@/payload-types";
import RichText from "@/components/ui/RichText";

function getIcon(type: CalloutBlock["style"]) {
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

type CalloutProps = {
  className?: string;
} & CalloutBlock;

export const Callout = (props: CalloutProps) => {
  const { style, blockName, content } = props;
  const Icon = getIcon(style);

  return (
    <div className="mb-6 bg-appLightColorBeige dark:bg-appDarkColorCoalBlack">
      {blockName && (
        <div className="flex gap-2 items-center bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-base">
          <Icon /> {blockName}
        </div>
      )}
      <div className="py-6 px-4">
        <RichText content={content} />
      </div>
    </div>
  );
};
