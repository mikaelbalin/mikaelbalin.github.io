import {
  ArticleListResponse,
  GlobalPageData,
  HomePageData,
  StrapiMetadata,
  TagListResponse,
} from "../types/data";
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
      { cache: "no-store" }, // opt out of Next.js cache
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
  url.searchParams.set("populate", "*");
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

export async function getArticles(
  start: number = 0,
  limit: number = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT),
  filter?: string,
) {
  const url = new URL("/api/articles", baseUrl);

  url.searchParams.append("sort[createdAt]", "desc");
  url.searchParams.append("populate[0]", "tags");
  url.searchParams.append("pagination[start]", start.toString());
  url.searchParams.append("pagination[limit]", limit.toString());
  filter && url.searchParams.append("filters[tags][slug]", filter);

  const response = await fetchData<ArticleListResponse>(url.href);
  return response;
}

export async function getTags() {
  const url = new URL("/api/tags", baseUrl);
  const { data } = await fetchData<TagListResponse>(url.href);
  return data;
}

export async function getArticle(slug: string) {
  const url = new URL("/api/articles", baseUrl);
  const { data } = await fetchData<ArticleListResponse>(url.href);
  return data;
}

export const getArticleBySlug = async (slug: string) => {
  const url = new URL(`/api/articles`, baseUrl);

  url.searchParams.append("filters[slug]", slug);
  url.searchParams.append("populate", "*");

  const { data } = await fetchData<any>(url.href);
  return data;
};
