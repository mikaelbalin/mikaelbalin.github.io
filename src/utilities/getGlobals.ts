import type { FooterSelect, HeaderSelect } from "@/types/payload";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { unstable_cache } from "next/cache";

async function getHeader() {
  const payload = await getPayload({ config: configPromise });

  const global = await payload.findGlobal<"header", HeaderSelect>({
    slug: "header",
    depth: 0,
  });

  return global;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 *
 * https://nextjs.org/docs/app/api-reference/functions/unstable_cache
 */
export const getCachedHeader = () =>
  unstable_cache(async () => getHeader(), ["header"], {
    tags: [`global_header`],
  });

async function getFooter() {
  const payload = await getPayload({ config: configPromise });

  const global = await payload.findGlobal<"footer", FooterSelect>({
    slug: "footer",
    depth: 1,
  });

  return global;
}

export const getCachedFooter = () =>
  unstable_cache(async () => getFooter(), ["footer"], {
    tags: [`global_footer`],
  });
