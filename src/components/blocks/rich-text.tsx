"use client";

import Image from "next/image";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

interface RichTextProps {
  block: {
    readonly content: BlocksContent;
  };
}

export default function RichText({ block }: RichTextProps) {
  if (!block.content) return null;
  return (
    <BlocksRenderer
      content={block.content}
      blocks={{
        image: ({ image }) => {
          return (
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={image.alternativeText || ""}
            />
          );
        },
      }}
    />
  );
}
