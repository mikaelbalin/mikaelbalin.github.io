"use client";

import { useState } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { UnstyledButton } from "#components/ui/UnstyledButton";
import { toast } from "sonner";
import { cn } from "#lib/utils";

interface CopyButtonProps
  extends Pick<React.HTMLAttributes<HTMLButtonElement>, "className"> {
  code: string;
}

export function CopyButton({ code, className }: Readonly<CopyButtonProps>) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  return (
    <UnstyledButton
      onClick={copyToClipboard}
      className={cn(
        "text-muted hover:text-soft-ivory absolute right-3 top-3 p-1.5 focus:outline-none",
        className,
      )}
      aria-label="Copy code"
    >
      {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
    </UnstyledButton>
  );
}
