import { logoutAction } from "@/data/actions/auth-actions";
import { UnstyledButton } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

export function LogoutForm() {
  return (
    <form action={logoutAction}>
      <UnstyledButton type="submit" title="Log out" className="block">
        <IconLogout stroke={2} />
      </UnstyledButton>
    </form>
  );
}
