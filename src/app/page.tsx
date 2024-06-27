import { About } from "@/components/About";
import { BlogPosts } from "@/components/BlogPosts";
import { Hero } from "@/components/Hero";
import { Subscription } from "@/components/Subscription";

async function getStrapiData(url: string) {
  const baseUrl = "http://localhost:1337";
  try {
    const response = await fetch(baseUrl + url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Page() {
  const strapiData = await getStrapiData("/api/home-page");

  const { title, description } = strapiData.data.attributes;

  return (
    <div>
      <Hero title={title} description={description} />
      <About />
      <BlogPosts />
      <Subscription />
    </div>
  );
}
