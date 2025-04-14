import { CollectionAfterErrorHook } from "payload";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import {
  BoldFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LexicalEditorProps,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import { handleSubscriber } from "#config/hooks/handleSubscriber";
import { beforeEmail } from "#config/hooks/beforeEmail";

const afterErrorHook: CollectionAfterErrorHook = async ({
  error,
  result,
  graphqlResult,
}) => {
  if ("code" in error && error.code === "SQLITE_CONSTRAINT_UNIQUE") {
    return {
      status: 409,
      response: {
        errors: ["The email address is already subscribed."],
      },
    };
  }

  return {
    status: 500,
    graphqlResult: graphqlResult,
    response: result,
  };
};

const getStandardFeatures: LexicalEditorProps["features"] = ({
  rootFeatures,
}) => {
  return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()];
};

const getEmailFeatures = () => {
  return [
    ParagraphFeature(),
    BoldFeature(),
    ItalicFeature(),
    LinkFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ];
};

export const formBuilderPluginConfig = formBuilderPlugin({
  fields: {
    payment: false,
  },
  formOverrides: {
    fields: ({ defaultFields }) => {
      return defaultFields.map((field) => {
        if ("name" in field && field.name === "confirmationMessage") {
          return {
            ...field,
            editor: lexicalEditor({
              features: getStandardFeatures,
            }),
          };
        }

        if (field.type === "blocks") {
          const blocks = field.blocks.map((block) => {
            if (block.slug === "message") {
              const blockFileds = block.fields.map((blockField) => {
                if (
                  "name" in blockField &&
                  blockField.name === "message" &&
                  blockField.type === "richText"
                ) {
                  return {
                    ...blockField,
                    editor: lexicalEditor({
                      features: getStandardFeatures,
                    }),
                  };
                }
                return blockField;
              });

              return {
                ...block,
                fields: blockFileds,
              };
            }

            return block;
          });

          return {
            ...field,
            blocks,
          };
        }

        if (
          "name" in field &&
          field.name === "emails" &&
          field.type === "array"
        ) {
          const fields = field.fields.map((arrayField) => {
            if (
              "name" in arrayField &&
              arrayField.name === "message" &&
              arrayField.type === "richText"
            ) {
              return {
                ...arrayField,
                editor: lexicalEditor({
                  features: getEmailFeatures,
                }),
              };
            }

            return arrayField;
          });

          return {
            ...field,
            fields,
          };
        }

        return field;
      });
    },
  },
  formSubmissionOverrides: {
    hooks: {
      beforeChange: [handleSubscriber],
      afterError: [afterErrorHook],
    },
  },
  beforeEmail,
});
