"use client";

import { CommentsForm } from "@/components/forms/CommentsForm";
import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Comment } from "./Comment";

export const Comments = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Comments" position="right">
        <CommentsForm />
        <div className="flex flex-col gap-8">
          {[1, 2, 3, 4, 5, 6, 7].map((comment) => (
            <Comment key={comment} />
          ))}
        </div>
      </Drawer>
      <Button onClick={open} variant="outline">
        Comments
      </Button>
    </>
  );
};
