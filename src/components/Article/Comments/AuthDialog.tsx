"use client";

import { LoginForm } from "#components/forms/LoginForm";
import { Button } from "#components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#components/ui/Dialog";

export type AuthStatus = "idle" | "success" | "error";

type AuthDialogProps = {
  open: boolean;
  status: AuthStatus;
  returnTo: string;
  onOpenChange: (open: boolean) => void;
};

export function AuthDialog({
  open,
  status,
  returnTo,
  onOpenChange,
}: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {status === "idle" && (
          <>
            <DialogHeader>
              <DialogTitle>Sign in with BlueSky</DialogTitle>
              <DialogDescription>Sign in to post a comment</DialogDescription>
            </DialogHeader>
            <LoginForm returnTo={returnTo} />
          </>
        )}

        {status === "success" && (
          <>
            <DialogHeader>
              <DialogTitle>You&apos;re signed in</DialogTitle>
              <DialogDescription>
                You can now post your comment
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)}>Continue</Button>
            </DialogFooter>
          </>
        )}

        {status === "error" && (
          <>
            <DialogHeader>
              <DialogTitle>Sign in failed</DialogTitle>
              <DialogDescription>
                Something went wrong. Please try again.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter showCloseButton />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
