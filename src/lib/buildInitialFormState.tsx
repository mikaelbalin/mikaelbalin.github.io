import { Form } from "@/types/payload";

export const buildInitialFormState = (fields?: Form["fields"] | null) => {
  return fields?.reduce<Record<string, string | boolean>>(
    (initialSchema, field) => {
      if (field.blockType === "checkbox") {
        return {
          ...initialSchema,
          [field.name]: Boolean(field.defaultValue),
        };
      }
      if (field.blockType === "country") {
        return {
          ...initialSchema,
          [field.name]: "",
        };
      }
      if (field.blockType === "email") {
        return {
          ...initialSchema,
          [field.name]: "",
        };
      }
      if (field.blockType === "text") {
        return {
          ...initialSchema,
          [field.name]: "",
        };
      }
      if (field.blockType === "select") {
        return {
          ...initialSchema,
          [field.name]: "",
        };
      }
      if (field.blockType === "state") {
        return {
          ...initialSchema,
          [field.name]: "",
        };
      }

      return initialSchema;
    },
    {},
  );
};
