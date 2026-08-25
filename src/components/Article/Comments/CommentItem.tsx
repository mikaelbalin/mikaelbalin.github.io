import { formatDateTime } from "#lib/formatDateTime";
import type { Comment } from "#lib/services/CommentService";

type CommentItemProps = {
  comment: Comment;
};

export function CommentItem({ comment }: CommentItemProps) {
  const { author, text, indexedAt } = comment;
  const displayName = author.displayName || author.handle;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="truncate text-base font-bold">{displayName}</div>

        <div className="text-sm text-muted-foreground flex gap-1 items-center">
          <div className="inline-flex w-2 h-2 bg-urban-fog" /> {formatDateTime(indexedAt)}
        </div>
      </div>

      <p className="text-base leading-5 whitespace-pre-wrap">{text}</p>
    </div>
  );
}
