import { Checkbox, type CheckboxProps } from "#components/ui/Checkbox";
import { Input, type InputProps } from "#components/ui/Input";
import { Textarea, type TextareaProps } from "#components/ui/Textarea";

export const fields: Record<
  string,
  React.FC<InputProps> | React.FC<TextareaProps> | React.FC<CheckboxProps>
> = {
  checkbox: Checkbox,
  email: Input,
  text: Input,
  textarea: Textarea,
};
