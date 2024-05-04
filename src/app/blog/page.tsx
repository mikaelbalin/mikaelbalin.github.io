import React from "react";
import { Subscription } from "../../components/Subscription";
import { BlogPosts } from "../../components/BlogPosts";

export default function Page() {
  return (
    <>
      <BlogPosts />
      <Subscription />
    </>
  );
}
