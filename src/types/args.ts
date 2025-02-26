import { Locale } from "@/i18n-config";

export type PageQueryParams = {
  slug: string[];
  lang: Locale | "all";
};

export type PostQueryParams = Partial<
  {
    slug: string;
  } & Pick<PageQueryParams, "lang">
>;

export type PageQueryArgs = Partial<PageQueryParams>;
export type PostQueryArgs = Partial<PostQueryParams>;
