import { formatDateTime } from "#lib/formatDateTime";
import type { Comment } from "#lib/services/CommentService";

type CommentItemProps = {
  comment: Comment;
};

export function CommentItem({ comment }: CommentItemProps) {
  const { author, text, indexedAt } = comment;
  const displayName = author.displayName || author.handle;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center gap-x-2">
        <span className="truncate font-semibold">{displayName}</span>
        <span className="truncate text-sm text-muted-foreground">
          @{author.handle}
        </span>
        <span className="text-sm text-muted-foreground">
          · {formatDateTime(indexedAt)}
        </span>
      </div>
      <p className="whitespace-pre-wrap text-sm">{text}</p>
    </div>
  );
}
