"use client";

import { Container } from "#components/Container";
import { Category, SearchBlock } from "#types/payload";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Text } from "#components/ui/Text";
import { ToggleGroup, ToggleGroupItem } from "#components/ui/ToggleGroup";

interface PostSearchProps extends Pick<SearchBlock, "title"> {
  categories: Pick<Category, "id" | "breadcrumbs">[];
}

export const PostSearch = ({ categories, title }: PostSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    params.set("page", "1"); // Reset to page 1 when changing category
    return params.toString();
  };

  const handleCategoryChange = (value: string) => {
    const query = createQueryString("category", value);
    router.replace(`${pathname}?${query}`, {
      scroll: false,
    });
  };

  return (
    <Container asChild className="pt-17">
      <section>
        <Text className="mb-8">{title}</Text>
        <ToggleGroup
          type="single"
          value={category || "all"}
          onValueChange={handleCategoryChange}
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          {categories.map(({ id, breadcrumbs }) => {
            const breadcrumb = breadcrumbs?.[0];
            return breadcrumb ? (
              <ToggleGroupItem
                key={id}
                value={breadcrumb.url?.replace("/", "") || ""}
              >
                {breadcrumb.label}
              </ToggleGroupItem>
            ) : null;
          })}
        </ToggleGroup>
      </section>
    </Container>
  );
};
