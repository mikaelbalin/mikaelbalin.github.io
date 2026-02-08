"use client";

import type { StaticImageData } from "next/image";
import NextImage from "next/image";
import type React from "react";
import type { Props as MediaProps } from "#components/ui/Media/types";
import { useBreakpointSizes } from "#hooks/useBreakpointSizes";
import { getClientSideURL } from "#lib/getURL";

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
  } = props;

  let width: number | undefined;
  let height: number | undefined;
  let alt = altFromProps;
  let src: StaticImageData | string = srcFromProps || "";

  if (!src && resource && typeof resource === "object") {
    const {
      alt: altFromResource,
      height: fullHeight,
      url,
      width: fullWidth,
    } = resource;

    width = fullWidth!;
    height = fullHeight!;
    alt = altFromResource || "";
    src = `${getClientSideURL()}${url}`;
  }

  const loading = loadingFromProps || "lazy";

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = useBreakpointSizes(sizeFromProps);

  return (
    <picture>
      <NextImage
        alt={alt || ""}
        fill={fill}
        height={!fill ? height : undefined}
        priority={priority}
        quality={100}
        loading={loading}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
      />
    </picture>
  );
};
