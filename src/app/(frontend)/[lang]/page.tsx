import Page, { generateMetadata, generateStaticParams } from "./[...slug]/page";

// Force static generation for home pages
export const dynamic = "force-static";
export const revalidate = 86400;

export default Page;

export { generateMetadata, generateStaticParams };
