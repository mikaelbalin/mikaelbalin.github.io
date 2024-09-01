"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Subscription } from "@/components/features/Subscription";
import { PostList } from "@/components/features/Post/PostList";
import { HeroBlog } from "@/components/features/Hero/HeroBlog";
import { PostSearch } from "@/components/features/Post/PostSearch";
import { ArticleListResponseDataItem, getArticles } from "@/data/loaders";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function Page() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<ArticleListResponseDataItem[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const responseData = await getArticles(start, limit);

      if (start === 0) {
        setData(responseData);
      } else {
        setData((prevData) => [...prevData, ...responseData]);
      }

      // setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  console.log({ data });

  // if (isLoading) return <Loader />;

  return (
    <>
      <HeroBlog />
      <PostList loadMore>
        <PostSearch />
      </PostList>
      <Subscription />
    </>
  );
}
