import { About } from "@/components/About";
import { BlogPosts } from "@/components/BlogPosts";
import { Hero } from "@/components/Hero";
import { Subscription } from "@/components/Subscription";

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";
  const url = new URL(path, baseUrl);
  url.searchParams.set("populate[blocks][populate][link][populate]", "true");
  try {
    const response = await fetch(url.href, { cache: "no-store" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Page() {
  const strapiData = await getStrapiData("/api/home-page");

  return (
    <div>
      <Hero data={strapiData.data.attributes.blocks[0]} />
      <About />
      <BlogPosts />
      <Subscription />
    </div>
  );
}
