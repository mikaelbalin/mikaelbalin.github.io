import { HeroMain } from "@/components/features/Hero/HeroMain";
import { About } from "@/components/features/About";
import { PostList } from "@/components/features/Post/PostList";
import { Subscription } from "@/components/features/Subscription";
import { getHomePageData, getHomePageMetaData } from "@/data/loaders";
import { Metadata } from "next";
import { AboutProps, HeroProps } from "types/data";
import { PostLatest } from "@/components/features/Post/PostLatest";
import { i18n } from "../../i18n-config";

function blockRenderer(block: HeroProps | AboutProps) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroMain key={block.__component} {...block} />;
    case "layout.about-section":
      return <About key={block.__component} {...block} />;
    default:
      return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getHomePageMetaData();
  const { metaTitle, metaDescription } = data.attributes.seo;
  return {
    title: metaTitle,
    description: metaDescription,
  };
}

export default async function Page() {
  const strapiData = await getHomePageData();
  const blocks = strapiData?.attributes?.blocks;
  if (!blocks) return <p>No sections found</p>;

  return (
    <>
      {blocks.map(blockRenderer)}
      <PostList>
        <PostLatest />
      </PostList>
      <Subscription />
    </>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
