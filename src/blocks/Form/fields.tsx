// import { Checkbox } from "./Checkbox";
// import { Country } from "./Country";
import { Email } from "./Email";
// import { Message } from "./Message";
// import { Number } from "./Number";
// import { Select } from "./Select";
// import { State } from "./State";
import { Text } from "./Text";
// import { Textarea } from "./Textarea";

import { TextInput, TextInputProps } from "@mantine/core";

export const fields: Record<string, React.FC<TextInputProps>> = {
  // checkbox: Checkbox,
  // country: Country,
  email: TextInput,
  // message: Message,
  // number: Number,
  // select: Select,
  // state: State,
  text: TextInput,
  // textarea: Textarea,
};
