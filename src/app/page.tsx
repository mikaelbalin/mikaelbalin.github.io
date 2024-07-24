import { Hero, type HeroProps } from "@/components/Hero";
import { About, type AboutProps } from "@/components/About";
import { BlogPosts } from "@/components/BlogPosts";
import { Subscription } from "@/components/Subscription";
import { getHomePageData } from "@/data";

function blockRenderer(block: HeroProps | AboutProps) {
  switch (block.__component) {
    case "layout.hero-section":
      return <Hero key={block.__component} {...block} />;
    case "layout.about-section":
      return <About key={block.__component} {...block} />;
    default:
      return null;
  }
}

export default async function Page() {
  const strapiData = await getHomePageData();
  const blocks = strapiData?.attributes?.blocks;
  if (!blocks) return <p>No sections found</p>;

  return (
    <>
      {blocks.map(blockRenderer)}
      <BlogPosts />
      <Subscription />
    </>
  );
}
