import type { CollectionConfig, CollectionAfterReadHook } from "payload";
import {
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { authenticated, authenticatedOrPublished } from "@/lib/access";
import { callout } from "@/config/blocks/callout";
import { media } from "@/config/blocks/media";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import { slugField } from "@/config/fields/slug";
import { getServerSideURL } from "@/utilities/getURL";
import { User } from "@/types/payload";
import { code } from "@/config/blocks/code";
import { kbd } from "@/config/blocks/kbd";
import { table } from "@/config/blocks/table";
import { timeToReadField } from "@/config/fields/time";
import { meta } from "@/config/plugins/seo";
import {
  revalidatePost,
  revalidateDelete,
} from "@/config/hooks/revalidatePost";

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthors: CollectionAfterReadHook = async ({
  doc,
  req,
  req: { payload },
}) => {
  if (doc?.authors) {
    const authorDocs: User[] = [];

    for (const author of doc.authors) {
      const authorDoc = await payload.findByID({
        id: typeof author === "object" ? author?.id : author,
        collection: "users",
        depth: 0,
        req,
      });

      if (authorDoc) {
        authorDocs.push(authorDoc);
      }
    }

    doc.populatedAuthors = authorDocs.map((authorDoc) => ({
      id: authorDoc.id,
      name: authorDoc.name,
    }));
  }

  return doc;
};

export const posts: CollectionConfig<"posts"> = {
  slug: "posts",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
    slug: true,
    relatedCategories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "posts",
        });

        return `${getServerSideURL()}${path}`;
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "posts",
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
          label: "Content",
          fields: [
            {
              name: "content",
              type: "richText",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    BlocksFeature({
                      blocks: [callout, code, media, table],
                      inlineBlocks: [kbd],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                    EXPERIMENTAL_TableFeature(),
                  ];
                },
              }),
              label: false,
              required: true,
            },
          ],
        },
        {
          label: "Meta",
          fields: [
            {
              name: "relatedPosts",
              type: "relationship",
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                };
              },
              hasMany: true,
              relationTo: "posts",
            },
            {
              name: "relatedCategories",
              type: "relationship",
              hasMany: true,
              relationTo: "categories",
            },
          ],
        },
        meta,
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "authors",
      type: "relationship",
      admin: {
        position: "sidebar",
      },
      hasMany: true,
      relationTo: "users",
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: "populatedAuthors",
      type: "array",
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: "id",
          type: "text",
        },
        {
          name: "name",
          type: "text",
        },
      ],
    },
    ...slugField(),
    ...timeToReadField(),
  ],
  hooks: {
    afterRead: [populateAuthors],
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete],
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
