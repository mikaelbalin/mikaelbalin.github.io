import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { beforeEmail } from "@/config/hooks/beforeEmail";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { addSubscriber } from "@/config/hooks/addSubscriber";
import { CollectionAfterErrorHook } from "payload";

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
              features: ({ rootFeatures }) => {
                return [...rootFeatures, FixedToolbarFeature()];
              },
            }),
          };
        }

        if ("name" in field && field.name === "emails") {
          // console.log("formOverrides", field);
        }

        return field;
      });
    },
  },
  formSubmissionOverrides: {
    hooks: {
      beforeChange: [addSubscriber],
      afterError: [afterErrorHook],
    },
  },
  beforeEmail,
});
