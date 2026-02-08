import type { PropsWithChildren } from "react";
import { Container } from "#components/Container";
import { PostItem } from "#components/Post/PostItem";
import type { Post } from "#types/payload";

type PostSummary = Pick<
  Post,
  "id" | "slug" | "relatedCategories" | "title" | "publishedAt" | "timeToRead"
>;

interface PostListProps
  extends PropsWithChildren,
    Pick<React.ComponentProps<"div">, "className"> {
  posts: PostSummary[];
  locale: "en" | "pt" | "all";
}

export const PostList = ({
  children,
  posts,
  className,
  locale,
}: PostListProps) => {
  return (
    <Container asChild className={className}>
      <section>
        {children}
        <div className="flex flex-col pt-14 sm:pt-20">
          {posts.map((item) => (
            <PostItem
              key={item.id}
              {...item}
              relationTo="posts"
              locale={locale}
            />
          ))}
        </div>
      </section>
    </Container>
  );
};
