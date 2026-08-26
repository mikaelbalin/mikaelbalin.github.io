"use client";

import { usePathname, useSearchParams } from "next/navigation";
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
import { useAuth } from "#context/auth-context";
import type { Comment } from "#lib/services/CommentService";
import { AuthDialog } from "./AuthDialog";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import { Button } from "#components/ui/Button";

import { useMediaQuery } from "@kaelui/hooks";
import { Separator } from "#components/ui/Separator";

const PENDING_COMMENT_KEY = "pendingComment";

type CommentsProps = {
  uri: string;
};

export function Comments({ uri }: CommentsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { user, refresh: refreshUser } = useAuth();

  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pendingText, setPendingText] = useState("");
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

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

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open);

    if (open) {
      // Refresh on open so the list reflects the latest replies.
      loadComments();
      refreshUser();
    }
  }, [loadComments, refreshUser]);

  // Handle returning from the OAuth flow (?auth=success|error). The toast is
  // shown by the AuthProvider; here we only react to the redirect locally.
  useEffect(() => {
    const auth = searchParams.get("auth");

    if (auth === "success" || auth === "error") {
      setOpen(true);
      loadComments();
      refreshUser();

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
    }
  }, [searchParams, uri, loadComments, refreshUser]);

  const handleSubmitComment = async (text: string): Promise<boolean> => {
    if (!user) {
      sessionStorage.setItem(
        PENDING_COMMENT_KEY,
        JSON.stringify({ uri, text }),
      );
      setAuthDialogOpen(true);
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
        <DrawerContent className="data-[swipe-axis=y]:h-[calc(100dvh-6rem)]">
          <DrawerHeader>
            <DrawerTitle>Comments</DrawerTitle>
            <DrawerDescription>
              {user ? (
                `Signed in as @${user.handle}`
              ) : (
                <>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm"
                    onClick={() => setAuthDialogOpen(true)}
                  >
                    Sign in
                  </Button>{" "}
                  with BlueSky to join the conversation
                </>
              )}
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-1 min-h-0 flex-col">
            <CommentForm
              onSubmitAction={handleSubmitComment}
              isSubmitting={submitting}
              initialText={pendingText}
            />

            <Separator className="mt-6" />

            <div className="flex-1 min-h-0 overflow-y-auto px-4 mask-[linear-gradient(to_bottom,transparent,black_1rem,black_calc(100%-1rem),transparent)]">
              <div className="flex flex-col gap-8 py-4">
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
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <AuthDialog
        open={authDialogOpen}
        returnTo={pathname}
        onOpenChangeAction={setAuthDialogOpen}
      />
    </>
  );
}
