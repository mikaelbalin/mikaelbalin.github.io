import { Hero, type HeroProps } from "@/components/Hero";
import { About, type AboutProps } from "@/components/About";
import { BlogPosts } from "@/components/BlogPosts";
import { Subscription } from "@/components/Subscription";

interface StrapiData {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      blocks: [HeroProps, AboutProps];
    };
  };
  meta: {};
}

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";
  const url = new URL(path, baseUrl);
  url.searchParams.set("populate[blocks][populate][link][populate]", "true");
  try {
    const response = await fetch(url.href, { cache: "no-store" }); // opt out of Next.js cache

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data }: StrapiData = await response.json();
    const t = data.attributes.blocks[0];
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Page() {
  const strapiData = await getStrapiData("/api/home-page");
  const heroData = strapiData?.attributes?.blocks?.[0];
  const aboutData = strapiData?.attributes?.blocks?.[1];

  return (
    <div>
      {heroData && <Hero {...heroData} />}
      {aboutData && <About {...aboutData} />}
      <BlogPosts />
      <Subscription />
    </div>
  );
}
