"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { BskyUser } from "#lib/auth/types";

interface AuthContextProps {
  user: BskyUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<boolean>;
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

  const signOut = useCallback(async (): Promise<boolean> => {
    try {
      await fetch("/api/oauth/logout", { method: "POST" });
      setUser(null);
      return true;
    } catch {
      return false;
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, refresh, signOut }),
    [user, loading, refresh, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
