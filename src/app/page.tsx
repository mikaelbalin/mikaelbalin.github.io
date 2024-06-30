import { About } from "@/components/About";
import { BlogPosts } from "@/components/BlogPosts";
import { Hero } from "@/components/Hero";
import { Subscription } from "@/components/Subscription";
import { getSdk } from "gql/file";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("http://localhost:1337/graphql");
const sdk = getSdk(client);

async function getStrapiData(url: string) {
  const baseUrl = "http://localhost:1337";
  try {
    const { data } = await sdk.homePageData();
    // const response = await fetch(baseUrl + url);
    // const data = await request("http://localhost:1337/graphql", query);
    // console.log(data);
    // const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Page() {
  const strapiData = await getStrapiData("/api/home-page");
  console.log(strapiData);

  // const { title, description } = strapiData.data.attributes;

  return (
    <div>
      {/* <Hero title={title} description={description} /> */}
      <About />
      <BlogPosts />
      <Subscription />
    </div>
  );
}
