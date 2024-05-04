import React from "react";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { BlogPosts } from "../components/BlogPosts";
import { Subscription } from "../components/Subscription";

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
