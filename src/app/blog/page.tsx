import React from "react";
import { Subscription } from "../../components/Subscription";
import { BlogPosts } from "../../components/BlogPosts";
import { HeroBlog } from "../../components/HeroBlog";

export default function Page() {
  return (
    <>
      <HeroBlog />
      <BlogPosts />
      <Subscription />
    </>
  );
}
