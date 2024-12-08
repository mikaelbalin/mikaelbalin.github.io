import { Checkbox } from "./Checkbox";
import { Country } from "./Country";
import { Email } from "./Email";
import { Message } from "./Message";
import { Number } from "./Number";
import { Select } from "./Select";
import { State } from "./State";
import { Text } from "./Text";
import { Textarea } from "./Textarea";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fields: Record<string, React.FC<any>> = {
  checkbox: Checkbox,
  country: Country,
  email: Email,
  message: Message,
  number: Number,
  select: Select,
  state: State,
  text: Text,
  textarea: Textarea,
};
