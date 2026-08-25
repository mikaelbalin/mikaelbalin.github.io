"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { UnstyledButton } from "#components/ui/UnstyledButton";
import { useAuth } from "#context/auth-context";
import type { LocaleParams } from "#i18n-config";

export function AuthButton() {
  const { lang = "en" } = useParams<LocaleParams>();
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return null;
  }

  if (user) {
    return (
        <UnstyledButton
          onClick={handleSignOut}
          className="text-sm sm:text-lg sm:px-4 sm:py-2"
        >
          Sign out
        </UnstyledButton>
    );
  }

  return (
    <Link
      href={`/${lang}/login?returnTo=${encodeURIComponent(pathname)}`}
      className="text-sm sm:text-lg sm:px-4 sm:py-2"
    >
      Sign in
    </Link>
  );
}
