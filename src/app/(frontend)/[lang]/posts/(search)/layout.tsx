import React from "react";
import { Subscription } from "@/components/features/Subscription";
import { PostSearch } from "@/components/features/Post/PostSearch";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Hero } from "@/components/features/Hero";

export default async function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getPayload({ config: configPromise });

  const categories = await payload.find({
    collection: "categories",
    depth: 1,
    limit: 20,
    overrideAccess: false,
    select: {
      breadcrumbs: true,
    },
  });

  return (
    <>
      <Hero type="blog" title="Blog" />
      <PostSearch categories={categories.docs} />
      {children}
      <Subscription
        blockType="subscription"
        title="Sign up now and ensure you catch every post"
        text="Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
      />
    </>
  );
}
