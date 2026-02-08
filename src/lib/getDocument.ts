import configPromise from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";
import type { Config } from "#types/payload";

type Collection = Extract<keyof Config["collections"], "pages" | "posts">;

async function getDocument(collection: Collection, slug: string, depth = 0) {
  const payload = await getPayload({ config: configPromise });

  const page = await payload.find({
    collection,
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return page.docs[0];
}

export const getCachedDocument = cache(getDocument);
