"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UnstyledButton } from "#components/ui/UnstyledButton";
import type { LocaleParams } from "#i18n-config";
import type { BskyUser } from "#lib/auth/types";

export function AuthButton() {
  const { lang = "en" } = useParams<LocaleParams>();
  const [user, setUser] = useState<BskyUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/oauth/me")
      .then((res) => res.json())
      .then((json) => setUser(json.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch("/api/oauth/logout", { method: "POST" });
      setUser(null);
      toast("Signed out");
    } catch {
      toast("Failed to sign out");
    }
  };

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden text-sm text-muted-foreground sm:inline">
          @{user.handle}
        </span>
        <UnstyledButton
          onClick={handleSignOut}
          className="text-lg sm:px-4 sm:py-2"
        >
          Sign out
        </UnstyledButton>
      </div>
    );
  }

  return (
    <Link href={`/${lang}/login`} className="text-lg sm:px-4 sm:py-2">
      Sign in
    </Link>
  );
}
