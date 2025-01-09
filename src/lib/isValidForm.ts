import { Form } from "@/types/payload";

export const isValidForm = (form: unknown): form is Form => {
  return (
    typeof form === "object" &&
    form !== null &&
    "fields" in form &&
    Array.isArray(form.fields)
  );
};
