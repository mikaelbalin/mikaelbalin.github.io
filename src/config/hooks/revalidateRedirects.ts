import type { CollectionAfterChangeHook } from "payload";
import { revalidateTag } from "next/cache";

/**
 * Hook to revalidate redirects after a document change in the collection.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.doc - The document that was changed.
 * @param {Object} params.req - The request object.
 * @param {Object} params.req.payload - The payload object containing the logger.
 * @returns {Object} The document that was changed.
 */
export const revalidateRedirects: CollectionAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating redirects`);

  revalidateTag("redirects");

  return doc;
};
