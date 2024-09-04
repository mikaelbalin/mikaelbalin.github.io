import { ArticleContent } from "@/components/features/Article/ArticleContent";
import { ArticleHeader } from "@/components/features/Article/ArticleHeader";
import { getArticleBySlug } from "@/data/loaders";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await getArticleBySlug(slug);

  if (data.length === 0) return <h2>no post found</h2>;

  return (
    <>
      <ArticleHeader tags={[]} />
      <ArticleContent data={data[0]} />
    </>
  );
}
