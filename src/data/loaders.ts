import {
  PostListResponse,
  GlobalPageData,
  HomePageData,
  StrapiMetadata,
  TagListResponse,
  SubscriptionResponse,
  ArticleResponseDataObject,
  Post,
} from "../types/data";
import { getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

async function fetchData<T>(url: string) {
  const authToken = null; // we will implement this later getAuthToken() later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      // { cache: "no-store" }, // opt out of Next.js cache
    );
    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("TypeError:", error.message);
    } else if (error instanceof SyntaxError) {
      console.error("SyntaxError:", error.message);
    } else if (error instanceof Error) {
      console.error("Generic Error:", error.message);
    } else {
      console.error("Unknown error type:", error);
    }
    throw null;
  }
}

export async function getHomePageMetaData() {
  const url = new URL("/api/home", baseUrl);

  url.searchParams.set("populate[seo]", "true");

  const data = await fetchData<StrapiMetadata>(url.href);
  return data;
}

export async function getHomePageData() {
  const url = new URL("/api/home", baseUrl);

  url.searchParams.set(
    "populate[hero][populate][contactLink][populate]",
    "true",
  );
  url.searchParams.set("populate[about][populate]", "true");
  url.searchParams.set("populate", "latestPostsLink");

  const { data } = await fetchData<{ data: HomePageData }>(url.href);
  return data;
}

export async function getGlobalPageData() {
  const url = new URL("/api/global", baseUrl);

  url.searchParams.append(`populate[header][populate]`, "logoText");
  url.searchParams.append(`populate[header][populate]`, "navLinks");
  url.searchParams.append(`populate[footer][populate][0]`, "contacts");
  url.searchParams.append(`populate[footer][populate][1]`, "social.socialLink");
  url.searchParams.append(`populate[footer][populate][2]`, "form.name");
  url.searchParams.append(`populate[footer][populate][3]`, "form.email");
  url.searchParams.append(`populate[footer][populate][4]`, "form.message");
  url.searchParams.append(
    `populate[footer][populate][5]`,
    "navigation.navLinks",
  );

  const { data } = await fetchData<{ data?: GlobalPageData }>(url.href);
  return data;
}

export async function getSubscriptionData() {
  const url = new URL("/api/global", baseUrl);

  url.searchParams.append(`populate[subscription][populate]`, "email");

  const { data } = await fetchData<{ data: SubscriptionResponse }>(url.href);
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

  const response = await fetchData<PostListResponse>(url.href);
  return response;
}

export async function getTags() {
  const url = new URL("/api/tags", baseUrl);
  const { data } = await fetchData<TagListResponse>(url.href);
  return data;
}

export async function getArticlesByTag(tags: string[]) {
  const url = new URL("/api/articles", baseUrl);

  tags.forEach((tag) => {
    url.searchParams.append("filters[tags][name][$in]", tag);
  });
  url.searchParams.append("pagination[limit]", "3");
  url.searchParams.append("populate[0]", "tags");

  const { data } = await fetchData<{
    data: Post[];
  }>(url.href);
  return data;
}

export const getArticleBySlug = async (slug: string) => {
  const url = new URL("/api/articles", baseUrl);

  url.searchParams.append("filters[slug]", slug);
  url.searchParams.append("populate", "*");

  const { data } = await fetchData<ArticleResponseDataObject>(url.href);
  return data;
};
