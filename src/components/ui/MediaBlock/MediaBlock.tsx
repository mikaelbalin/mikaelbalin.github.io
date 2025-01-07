import type { StaticImageData } from "next/image";
import { cn } from "@/utilities/cn";
import React from "react";
import RichText from "@/components/ui/RichText";
import type { MediaBlock as MediaBlockProps } from "@/payload-types";
import { Media } from "@/components/ui/Media";

type Props = MediaBlockProps & {
  breakout?: boolean;
  staticImage?: StaticImageData;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const { media, staticImage } = props;

  let caption;
  if (media && typeof media === "object") caption = media.caption;

  return (
    <div className={cn("")}>
      <Media resource={media} src={staticImage} />
      {caption && (
        <div className={cn("")}>
          <RichText content={caption} />
        </div>
      )}
    </div>
  );
};
