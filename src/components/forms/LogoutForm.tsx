import { UnstyledButton } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

export function LogoutForm() {
  return (
    <form action={() => void 0}>
      <UnstyledButton type="submit" title="Log out" className="block">
        <IconLogout stroke={2} />
      </UnstyledButton>
    </form>
  );
}
