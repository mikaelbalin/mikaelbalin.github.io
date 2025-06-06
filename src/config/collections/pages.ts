import { about } from "#config/blocks/about";
import { archive } from "#config/blocks/archive";
import { content } from "#config/blocks/content";
import { reusableBlock } from "#config/blocks/reusableBlock";
import { search } from "#config/blocks/search";
import { hero } from "#config/fields/hero";
import { slugField } from "#config/fields/slug";
import { populatePublishedAt } from "#config/hooks/populatePublishedAt";
import { meta } from "#config/plugins/seo";
import { authenticated, authenticatedOrPublished } from "#lib/access";
import { generatePreviewPath } from "#lib/generatePreviewPath";
import { getServerSideURL } from "#lib/getURL";
import type { CollectionConfig } from "payload";

export const pages: CollectionConfig<"pages"> = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "pages",
        });

        return `${getServerSideURL()}${path}`;
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "pages",
      });

      return `${getServerSideURL()}${path}`;
    },
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [hero],
          label: "Hero",
        },
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [about, archive, search, reusableBlock, content],
              required: true,
            },
          ],
          label: "Content",
        },
        meta,
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
};
