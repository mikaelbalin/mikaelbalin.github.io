import React from "react";
import { Subscription } from "@/components/features/Subscription";
import { HeroBlog } from "@/components/features/Hero/HeroBlog";
import { getTags } from "@/data/loaders";
import { PostSearch } from "@/components/features/Post/PostSearch";

export default async function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tags = await getTags();

  return (
    <>
      <HeroBlog />
      <PostSearch tags={tags} />
      {children}
      <Subscription />
    </>
  );
}
