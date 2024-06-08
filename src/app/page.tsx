import { About } from "@/components/About";
import { BlogPosts } from "@/components/BlogPosts";
import { Hero } from "@/components/Hero";
import { Subscription } from "@/components/Subscription";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <BlogPosts />
      <Subscription />
    </>
  );
}
