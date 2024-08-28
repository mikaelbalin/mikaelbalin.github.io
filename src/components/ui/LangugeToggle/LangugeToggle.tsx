import { IconChevronDown } from "@tabler/icons-react";

export const LangugeToggle = ({
  label,
  linksOpened,
}: {
  label: string;
  linksOpened: boolean;
}) => (
  <>
    <span className="mr-1">{label}</span>
    <IconChevronDown
      size="1rem"
      style={{
        transform: `rotate(${linksOpened ? 180 : 0}deg)`,
      }}
      className="text-black"
    />
  </>
);
