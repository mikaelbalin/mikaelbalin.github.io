import type { Form } from "#types/payload";

export const buildInitialFormState = (fields?: Form["fields"] | null) => {
  return fields?.reduce<Record<string, string | boolean>>(
    (initialSchema, field) => {
      if (field.blockType === "checkbox") {
        initialSchema[field.name] = Boolean(field.defaultValue);
        return initialSchema;
      }
      if (field.blockType === "textarea") {
        initialSchema[field.name] = "";
        return initialSchema;
      }
      if (field.blockType === "email") {
        initialSchema[field.name] = "";
        return initialSchema;
      }
      if (field.blockType === "text") {
        initialSchema[field.name] = "";
        return initialSchema;
      }
      if (field.blockType === "select") {
        initialSchema[field.name] = "";
        return initialSchema;
      }
      if (field.blockType === "state") {
        initialSchema[field.name] = "";
        return initialSchema;
      }

      return initialSchema;
    },
    {},
  );
};
