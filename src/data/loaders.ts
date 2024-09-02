import { GlobalPageData, HomePageData, StrapiMetadata } from "../types/data";
import { getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

async function fetchData<T>(url: string) {
  const authToken = null; // we will implement this later getAuthToken() later
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(
      url,
      authToken ? headers : { cache: "no-store" }, // opt out of Next.js cache
    );
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function getHomePageMetaData() {
  const url = new URL("/api/home-page", baseUrl);
  url.searchParams.set("populate[seo]", "true");
  const data = await fetchData<StrapiMetadata>(url.href);
  return data;
}

export async function getHomePageData() {
  const url = new URL("/api/home-page", baseUrl);
  url.searchParams.set("populate[blocks][populate][link][populate]", "true");
  const { data } = await fetchData<HomePageData>(url.href);
  return data;
}

export async function getGlobalPageData() {
  const url = new URL("/api/global", baseUrl);

  [
    "header.logoText",
    "header.scrollTexts",
    "footer.contactsTitle",
    "footer.email",
    "footer.phone",
    "footer.socialTitle",
    "footer.socialLink",
    "footer.formTitle",
  ].forEach((param, index) => {
    url.searchParams.append(`populate[${index}]`, param);
  });

  const { data } = await fetchData<GlobalPageData>(url.href);
  return data;
}

interface TagResponseDataObject {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
}

export interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

// interface ComponentsRichTextComponent {
//   id: number;
//   __component: "string";
//   content: unknown;
// }

export interface Article {
  title: string;
  slug: string;
  tags: {
    data: TagResponseDataObject[];
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface ArticleListResponseDataItem {
  id: string;
  attributes: Article;
}

interface ArticleListResponse {
  data: ArticleListResponseDataItem[];
  meta: Meta;
}

export async function getArticles(start: number, limit: number) {
  const url = new URL("/api/articles", baseUrl);
  url.searchParams.append("sort[createdAt]", "desc");
  url.searchParams.append("populate[0]", "tags");
  url.searchParams.append("pagination[start]", start.toString());
  url.searchParams.append("pagination[limit]", limit.toString());
  const response = await fetchData<ArticleListResponse>(url.href);
  return response;
}

export async function getArticle(slug: string) {
  const url = new URL("/api/articles", baseUrl);
  const { data } = await fetchData<ArticleListResponse>(url.href);
  return data;
}
