import React from "react";
import { Subscription } from "@/components/features/Subscription";
import { PostList } from "@/components/features/Post/PostList";
import { Hero } from "@/components/features/Hero/Blog";

export default function Page() {
  return (
    <>
      <Hero />
      <PostList />
      <Subscription />
    </>
  );
}
