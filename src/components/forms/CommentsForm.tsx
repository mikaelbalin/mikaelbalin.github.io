"use client";

import { Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

export const CommentsForm = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      comment: "",
    },
    // validate: {},
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
      className="mb-10"
    >
      <Textarea
        label="What are your thoughts?"
        placeholder="Write comment here… "
        key={form.key("comment")}
        {...form.getInputProps("comment")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit comment</Button>
      </Group>
    </form>
  );
};
