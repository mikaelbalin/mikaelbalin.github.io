import { ArticleContent } from "@/components/features/Article/ArticleContent";
import { getArticleBySlug } from "@/data/loaders";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const data = await getArticleBySlug(slug);

  if (!data?.length) return <h2>no post found</h2>;

  const post = data[0];

  return <ArticleContent {...post} />;
}
