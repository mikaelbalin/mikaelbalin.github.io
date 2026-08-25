"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { toast } from "sonner";
import type { BskyUser } from "#lib/auth/types";

interface AuthContextProps {
  user: BskyUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<BskyUser | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/oauth/me");
      const json = await res.json();
      setUser(json.user ?? null);
    } catch {
      setUser(null);
    }
  }, []);

  // Fetch the current user once on mount so the Navbar can render the correct
  // sign-in/sign-out state. Consumers that need fresh data call `refresh`.
  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  // Handle the OAuth redirect result (?auth=success|error). This lives here
  // (rather than in a specific page/component) so the toast shows regardless of
  // which page the user is redirected back to. The provider also mounts before
  // the <Toaster /> in the layout, so the toast is dispatched after Sonner has
  // subscribed and renders correctly.
  useEffect(() => {
    const auth = searchParams.get("auth");

    if (auth === "success" || auth === "error") {
      if (auth === "error") {
        toast("Sign in failed", {
          description: "Something went wrong. Please try again.",
        });
      } else {
        toast("Signed in");
      }

      // Remove the ?auth param from the URL without a full navigation.
      const params = new URLSearchParams(searchParams.toString());
      params.delete("auth");
      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ""}`, {
        scroll: false,
      });
    }
  }, [searchParams, pathname, router]);

  const signOut = useCallback(async (): Promise<void> => {
    try {
      await fetch("/api/oauth/logout", { method: "POST" });
      setUser(null);
      toast("Signed out");
    } catch {
      toast("Failed to sign out");
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, refresh, signOut }),
    [user, loading, refresh, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
