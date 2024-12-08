import { ArticleContent } from "@/components/features/Article/ArticleContent";
import { getArticleBySlug } from "@/data/loaders";
import { i18n } from "../../../../../../i18n-config";
import { getArticles } from "@/data/loaders";

export async function generateStaticParams() {
  const { data } = await getArticles();

  return data.flatMap(({ slug }) =>
    i18n.locales.map((lang) => ({ slug, lang })),
  );
}

export default async function Page(props: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const data = await getArticleBySlug(slug);

  if (!data?.length) return <h2>no post found</h2>;

  const post = data[0];

  return <ArticleContent {...post} />;
}
