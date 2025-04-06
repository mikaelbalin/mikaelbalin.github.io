import { ArticleFooter } from "#components/Article/ArticleFooter";
import { ArticleHeader } from "#components/Article/ArticleHeader";
import { PostList } from "#components/Post/PostList";
import { PayloadRedirects } from "#components/ui/PayloadRedirects";
import { Title } from "#components/ui/Title";
import { i18n, Locale } from "#i18n-config";
import { filterPayloadRelations } from "#lib/filterPayloadRelations";
import { formatDateTime } from "#lib/formatDateTime";
import { getClientSideURL } from "#lib/getURL";
import { PostService } from "#lib/services/PostService";

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
          className="hidden py-24 sm:block"
          locale={lang}
        >
          <Title order={2}>Similar articles</Title>
        </PostList>
      )}
    </>
  );
}
