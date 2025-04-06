import { Button } from "#components/ui/Button";
import { cn } from "#lib/utils";
import type { ArchiveBlock } from "#types/payload";
import Link from "next/link";

type PostLatestProps = Pick<ArchiveBlock, "title" | "latestPostsLink"> & {
  locale?: "en" | "pt" | "all";
};

export const PostLatest = (props: PostLatestProps) => {
  const { title, latestPostsLink, locale = "en" } = props;
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-8 pt-16",
        "sm:flex-row sm:items-end sm:justify-between sm:pt-24",
      )}
    >
      <h2 className="text-6xl font-bold sm:text-11xl">{title}</h2>
      <Button asChild variant="outline" size="lg" className="shrink-0">
        <Link href={`${locale}${latestPostsLink.url}`}>
          {latestPostsLink.label}
        </Link>
      </Button>
    </div>
  );
};
