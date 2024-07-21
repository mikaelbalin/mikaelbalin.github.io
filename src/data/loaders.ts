import { GlobalPageData, HomePageData } from "../types/data";
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

export async function getHomePageData() {
  const url = new URL("/api/home-page", baseUrl);
  url.searchParams.set("populate[blocks][populate][link][populate]", "true");
  const { data } = await fetchData<HomePageData>(url.href);
  return data;
}

export async function getGlobalPageData() {
  const url = new URL("/api/global", baseUrl);
  url.searchParams.set("populate[0]", "header.logoText");
  url.searchParams.append("populate[1]", "header.scrollTexts");
  url.searchParams.append("populate[2]", "footer.contactsTitle");
  url.searchParams.append("populate[3]", "footer.email");
  url.searchParams.append("populate[4]", "footer.phone");
  url.searchParams.append("populate[5]", "footer.socialTitle");
  url.searchParams.append("populate[6]", "footer.socialLink");
  url.searchParams.append("populate[7]", "footer.formTitle");
  const { data } = await fetchData<GlobalPageData>(url.href);
  return data;
}
