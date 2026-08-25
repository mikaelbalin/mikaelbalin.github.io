"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "#components/ui/Drawer";
import type { BskyUser } from "#lib/auth/types";
import type { Comment } from "#lib/services/CommentService";
import { AuthDialog, type AuthStatus } from "./AuthDialog";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import { Button } from "#components/ui/Button";
import { ScrollArea } from "#components/ui/ScrollArea";
import { useMediaQuery } from "@kaelui/hooks";

const PENDING_COMMENT_KEY = "pendingComment";

type CommentsProps = {
  uri: string;
};

export function Comments({ uri }: CommentsProps) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<BskyUser | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pendingText, setPendingText] = useState("");
  const [authDialog, setAuthDialog] = useState<{
    open: boolean;
    status: AuthStatus;
  }>({ open: false, status: "idle" });

  const isDesktop = useMediaQuery(`(min-width: 48rem)`);

  const loadComments = useCallback(async () => {
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/comments?uri=${encodeURIComponent(uri)}`);
      const json = await res.json();
      if (res.ok) {
        setComments(json.comments ?? []);
      }
    } catch {
      // ignore
    } finally {
      setLoadingComments(false);
    }
  }, [uri]);

  const loadUser = useCallback(async () => {
    try {
      const res = await fetch("/api/oauth/me");
      const json = await res.json();
      setUser(json.user ?? null);
    } catch {
      setUser(null);
    }
  }, []);

  // Preload comments and the current user as soon as the component mounts,
  // so the data is already available before the Drawer is opened.
  useEffect(() => {
    loadComments();
    loadUser();
  }, [loadComments, loadUser]);

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open);

    if (open) {
      // Refresh on open so the list reflects the latest replies.
      loadComments();
      loadUser();
    }
  }, [loadComments, loadUser]);

  // Handle returning from the OAuth flow (?auth=success|error).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get("auth");

    if (auth === "success" || auth === "error") {
      setOpen(true);
      setAuthDialog({ open: true, status: auth });
      loadComments();
      loadUser();

      // Restore the pending draft.
      const raw = sessionStorage.getItem(PENDING_COMMENT_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed?.uri === uri && typeof parsed.text === "string") {
            setPendingText(parsed.text);
          }
        } catch {
          // ignore
        }
        sessionStorage.removeItem(PENDING_COMMENT_KEY);
      }

      // Remove the ?auth param from the URL without a full navigation.
      params.delete("auth");
      const query = params.toString();
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${query ? `?${query}` : ""}`,
      );
    }
  }, [uri, loadComments, loadUser]);

  const handleSubmitComment = async (text: string): Promise<boolean> => {
    if (!user) {
      sessionStorage.setItem(
        PENDING_COMMENT_KEY,
        JSON.stringify({ uri, text }),
      );
      setAuthDialog({ open: true, status: "idle" });
      return false;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uri, text }),
      });
      const json = await res.json();

      if (!res.ok) {
        toast("Failed to post comment", { description: json.error });
        return false;
      }

      toast("Comment posted");

      // Optimistically add the new comment so it appears immediately, without
      // waiting for the Bluesky AppView to index the reply (which can lag).
      const result = json.comment as { uri: string; cid: string } | undefined;
      if (result) {
        const newComment: Comment = {
          uri: result.uri,
          cid: result.cid,
          author: {
            did: user.did,
            handle: user.handle,
            displayName: user.displayName,
          },
          text,
          indexedAt: new Date().toISOString(),
        };
        setComments((prev) => [newComment, ...prev]);
      }

      return true;
    } catch (error) {
      toast("Failed to post comment", {
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Drawer
        open={open}
        onOpenChange={handleOpenChange}
        showSwipeHandle={!isDesktop}
        swipeDirection={isDesktop ? "right" : "down"}
      >
        <DrawerTrigger render={<Button variant="outline">Comments</Button>} />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Comments</DrawerTitle>
            <DrawerDescription>
              {user
                ? `Signed in as @${user.handle}`
                : "Sign in with BlueSky to join the conversation"}
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-1 min-h-0 flex-col gap-6 p-4">
            <CommentForm
              onSubmitAction={handleSubmitComment}
              isSubmitting={submitting}
              initialText={pendingText}
            />

            <ScrollArea className="flex-1 min-h-0">
              <div className="flex flex-col gap-8 pr-4">
                {loadingComments ? (
                  <p className="text-sm text-muted-foreground">
                    Loading comments...
                  </p>
                ) : comments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No comments yet. Be the first to comment!
                  </p>
                ) : (
                  comments.map((comment) => (
                    <CommentItem key={comment.uri} comment={comment} />
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>

      <AuthDialog
        open={authDialog.open}
        status={authDialog.status}
        returnTo={pathname}
        onOpenChange={(nextOpen) =>
          setAuthDialog((prev) => ({ ...prev, open: nextOpen }))
        }
      />
    </>
  );
}
