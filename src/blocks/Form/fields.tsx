import {
  Textarea,
  TextInput,
  TextInputProps,
  TextareaProps,
  Checkbox,
  CheckboxProps,
} from "@mantine/core";

export const fields: Record<
  string,
  React.FC<TextInputProps> | React.FC<TextareaProps> | React.FC<CheckboxProps>
> = {
  checkbox: Checkbox,
  email: TextInput,
  text: TextInput,
  textarea: Textarea,
};
