"use client";

import { LoginForm } from "#components/forms/LoginForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "#components/ui/Dialog";

type AuthDialogProps = {
  open: boolean;
  returnTo: string;
  onOpenChangeAction: (open: boolean) => void;
};

export function AuthDialog({
  open,
  returnTo,
  onOpenChangeAction,
}: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in with BlueSky</DialogTitle>
          <DialogDescription>Sign in to post a comment</DialogDescription>
        </DialogHeader>
        <LoginForm returnTo={returnTo} />
      </DialogContent>
    </Dialog>
  );
}
