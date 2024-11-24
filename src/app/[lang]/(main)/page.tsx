import { HeroMain } from "@/components/features/Hero/HeroMain";
import { About } from "@/components/features/About";
import { PostList } from "@/components/features/Post/PostList";
import { Subscription } from "@/components/features/Subscription";
import {
  getArticles,
  getHomePageData,
  // getHomePageMetaData,
  getSubscriptionData,
} from "@/data/loaders";
// import { Metadata } from "next";
import { PostLatest } from "@/components/features/Post/PostLatest";
import { i18n } from "../../../i18n-config";

// export async function generateMetadata(): Promise<Metadata> {
//   const { data } = await getHomePageMetaData();
//   const { metaTitle, metaDescription } = data.attributes.seo;
//   return {
//     title: metaTitle,
//     description: metaDescription,
//   };
// }

export default async function Page() {
  const strapiData = await getHomePageData();
  const subscriptionData = await getSubscriptionData();
  const { data: articlesData } = await getArticles();

  if (!strapiData) return null;

  return (
    <>
      <HeroMain {...strapiData.hero} />
      <About {...strapiData.about} />
      <PostList initialData={articlesData}>
        <PostLatest
          latestPostsLink={strapiData.latestPostsLink}
          latestPostsTitle={strapiData.latestPostsTitle}
        />
      </PostList>
      <Subscription {...subscriptionData.subscription} />
    </>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
