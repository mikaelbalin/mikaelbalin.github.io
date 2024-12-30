// import { Subscription } from "@/components/features/Subscription";
// import { getHomePageMetaData, getSubscriptionData } from "@/data/loaders";
// import { Metadata } from "next";
// import { generateLanguageParams } from "../../../../i18n-config";

// export async function generateMetadata(): Promise<Metadata> {
//   const { data } = await getHomePageMetaData();
//   const { metaTitle, metaDescription } = data.attributes.seo;
//   return {
//     title: metaTitle,
//     description: metaDescription,
//   };
// }

// export default async function Page() {
//   const subscriptionData = await getSubscriptionData();

//   return <Subscription {...subscriptionData.subscription} />;
// }

// export const generateStaticParams = generateLanguageParams;

import PageTemplate, { generateMetadata } from "./[slug]/page";

export default PageTemplate;

export { generateMetadata };
