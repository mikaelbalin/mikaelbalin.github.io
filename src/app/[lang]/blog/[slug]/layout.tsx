import React from "react";
import { ArticleHeader } from "@/components/features/Article/ArticleHeader";

export default async function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article>
      <ArticleHeader tags={[]} />
      {children}
    </article>
  );
}
