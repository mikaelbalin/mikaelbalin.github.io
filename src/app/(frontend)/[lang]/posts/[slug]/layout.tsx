import { ArticleHeader } from "@/components/features/Article/ArticleHeader";
import { ArticleFooter } from "@/components/features/Article/ArticleFooter";
import { PostList } from "@/components/features/Post/PostList";
import { Title } from "@mantine/core";
import { PayloadRedirects } from "@/components/ui/PayloadRedirects";
import { formatDateTime } from "@/utilities/formatDateTime";
import { getClientSideURL } from "@/utilities/getURL";
import { i18n, Locale } from "@/i18n-config";
import { PostService } from "@/lib/services/PostService";
import { filterPayloadRelations } from "@/lib/filterPayloadRelations";

type Args = {
  params: Promise<{
    slug: string;
    lang: Locale | "all";
  }>;
};

type LayoutProps = Readonly<
  {
    children: React.ReactNode;
  } & Args
>;

export default async function Layout(props: LayoutProps) {
  const { children } = props;
  const params = await props.params;
  const { slug = "", lang = i18n.defaultLocale } = params;

  const data = await PostService.getPostLayoutData({
    slug,
  });

  if (!data) return <PayloadRedirects path={`/${lang}/posts/${slug}`} />;

  const { relatedCategories, title, relatedPosts, publishedAt, timeToRead } =
    data;
  const currentUrl = `${getClientSideURL()}/${lang}/posts/${slug}`;

  return (
    <>
      <article>
        <ArticleHeader
          title={title}
          categories={
            Array.isArray(relatedCategories)
              ? filterPayloadRelations(relatedCategories)
              : []
          }
          date={formatDateTime(publishedAt)}
          timeToRead={timeToRead}
        />
        {children}
        <ArticleFooter url={currentUrl} />
      </article>

      {Array.isArray(relatedPosts) && relatedPosts.length > 0 && (
        <PostList
          posts={filterPayloadRelations(relatedPosts)}
          className="hidden sm:block py-24"
          locale={lang}
        >
          <Title order={2}>Similar articles</Title>
        </PostList>
      )}
    </>
  );
}
