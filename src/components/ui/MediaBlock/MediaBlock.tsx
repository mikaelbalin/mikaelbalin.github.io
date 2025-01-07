import type { StaticImageData } from "next/image";
import { cn } from "@/utilities/cn";
import React from "react";
import RichText from "@/components/ui/RichText";
import type { MediaBlock as MediaBlockProps } from "@/payload-types";
import { Media } from "@/components/ui/Media";

type Props = MediaBlockProps & {
  breakout?: boolean;
  captionClassName?: string;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props;

  let caption;
  if (media && typeof media === "object") caption = media.caption;

  return (
    <div className={cn("")}>
      <Media
        imgClassName={cn("border border-border rounded-[0.8rem]", imgClassName)}
        resource={media}
        src={staticImage}
      />
      {caption && (
        <div
          className={cn(
            "mt-6",
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText content={caption} enableGutter={false} />
        </div>
      )}
    </div>
  );
};
