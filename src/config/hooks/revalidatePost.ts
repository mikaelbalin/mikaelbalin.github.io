import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { revalidatePath } from "next/cache";
import { Post } from "@/types/payload";

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context, i18n, locale },
}) => {
  if (!context.disableRevalidate) {
    console.log({ doc, i18n, locale });

    if (doc._status === "published") {
      const path = `/en/posts/${doc.slug}`;

      payload.logger.info(`Revalidating post at path: ${path}`);

      revalidatePath(path);
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === "published" && doc._status !== "published") {
      const oldPath = `/en/posts/${previousDoc.slug}`;

      payload.logger.info(`Revalidating old post at path: ${oldPath}`);

      revalidatePath(oldPath);
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/en/posts/${doc?.slug}`;

    revalidatePath(path);
  }

  return doc;
};
