"use client";

import { cn } from "@/utilities/cn";
import { Container, Pagination as MantinePagination } from "@mantine/core";
import {
  IconArrowRight,
  IconArrowLeft,
  IconArrowBarToLeft,
  IconArrowBarToRight,
  IconDots,
} from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const Pagination: React.FC<{
  totalPages: number;
}> = (props) => {
  const { totalPages } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    const page = searchParams.get("page");
    const pageNumber = page ? parseInt(page) : 1;

    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  }, [searchParams, totalPages]);

  const createQueryString = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return params.toString();
  };

  const handlePageChange = (value: number) => {
    setPage(value);
    const query = createQueryString(value);
    router.replace(`${pathname}?${query}`, {
      scroll: false,
    });
  };

  const handlePreviousPage = () => {
    const newPage = activePage - 1;
    handlePageChange(newPage);
  };

  const handleNextPage = () => {
    const newPage = activePage + 1;
    handlePageChange(newPage);
  };

  return totalPages > 1 ? (
    <Container className={cn("flex justify-center", "mt-14 sm:mt-26")}>
      <MantinePagination
        total={totalPages}
        value={activePage}
        onChange={handlePageChange}
        withEdges
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        nextIcon={IconArrowRight}
        previousIcon={IconArrowLeft}
        firstIcon={IconArrowBarToLeft}
        lastIcon={IconArrowBarToRight}
        dotsIcon={IconDots}
      />
    </Container>
  ) : null;
};
