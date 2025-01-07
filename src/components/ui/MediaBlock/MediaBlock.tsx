import type { StaticImageData } from "next/image";
import React from "react";
import RichText from "@/components/ui/RichText";
import type { MediaBlock as MediaBlockProps } from "@/payload-types";
import { Media } from "@/components/ui/Media";

type Props = MediaBlockProps & {
  staticImage?: StaticImageData;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const { media, staticImage } = props;

  let caption;
  if (media && typeof media === "object") caption = media.caption;

  return (
    <div className="mb-8">
      <Media resource={media} src={staticImage} />
      {caption && (
        <div className="mt-4 text-center">
          <RichText content={caption} textClassName="!text-sm" />
        </div>
      )}
    </div>
  );
};
