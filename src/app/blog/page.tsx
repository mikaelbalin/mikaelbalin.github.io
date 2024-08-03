import React from "react";
import { Subscription } from "@/components/features/Subscription";
import { PostList } from "@/components/features/Post/PostList";
import { HeroBlog } from "@/components/features/Hero/HeroBlog";

export default function Page() {
  return (
    <>
      <HeroBlog />
      <PostList />
      <Subscription />
    </>
  );
}
