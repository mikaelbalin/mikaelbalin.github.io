import type { CheckboxField, NumberField } from "payload";
import { calculateReadingTimeHook } from "#config/fields/time/calculateReadingTime";

type Overrides = {
  timeToReadOverrides?: Partial<NumberField>;
  checkboxOverrides?: Partial<CheckboxField>;
};

type TimeToRead = (
  fieldToUse?: string,
  overrides?: Overrides,
) => [NumberField, CheckboxField];

export const timeToReadField: TimeToRead = (
  fieldToUse = "content",
  overrides = {},
) => {
  const { timeToReadOverrides, checkboxOverrides } = overrides;

  const checkBoxField: CheckboxField = {
    name: "timeToReadLock",
    type: "checkbox",
    defaultValue: true,
    admin: {
      hidden: true,
      position: "sidebar",
    },
    ...checkboxOverrides,
  };

  const timeToReadField: NumberField = {
    name: "timeToRead",
    type: "number",
    index: true,
    label: "Time to read",
    defaultValue: 1,
    min: 1,
    ...(timeToReadOverrides || {}),
    hooks: {
      // Kept this in for hook or API based updates
      beforeValidate: [calculateReadingTimeHook(fieldToUse)],
    },
    admin: {
      position: "sidebar",
      description: "Estimated time to read in minutes",
      ...(timeToReadOverrides?.admin || {}),
      components: {
        Field: {
          path: "@/components/admin/TimeToRead#TimeToRead",
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
    hasMany: undefined,
    maxRows: undefined,
    minRows: undefined,
    validate: undefined,
  };

  return [timeToReadField, checkBoxField];
};
