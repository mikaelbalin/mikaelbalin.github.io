import { Locale } from "#i18n-config";
import { ArchiveBlock } from "#types/payload";

export type PageQueryParams = {
  slug: string[];
  lang: Locale | "all";
};

export type PostQueryParams = {
  slug: string;
} & Pick<PageQueryParams, "lang">;

export type PageQueryArgs = Partial<PageQueryParams>;
export type PostQueryArgs = Partial<PostQueryParams>;

export interface ArchivePostsArgs
  extends Pick<
    ArchiveBlock,
    "categories" | "limit" | "populateBy" | "selectedDocs"
  > {
  locale: "en" | "pt" | "all";
}
