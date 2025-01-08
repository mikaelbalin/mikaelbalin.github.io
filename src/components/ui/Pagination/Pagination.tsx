"use client";

import { cn } from "@/utilities/cn";
import { Container, Pagination as MantinePagination } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const Pagination: React.FC<{
  totalPages: number;
}> = (props) => {
  const { totalPages } = props;

  const router = useRouter();
  const [activePage, setPage] = useState(1);

  return (
    <Container className={cn("flex justify-center", "mt-14 sm:mt-26")}>
      <MantinePagination
        total={totalPages}
        value={activePage}
        onChange={(value) => {
          setPage(value);
        }}
        withEdges
        onPreviousPage={() => {
          router.push(`/posts/page/${activePage - 1}`);
        }}
        onNextPage={() => {
          router.push(`/posts/page/${activePage + 1}`);
        }}
      />
    </Container>
  );
};
