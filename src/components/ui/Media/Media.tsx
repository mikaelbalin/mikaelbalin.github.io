import React from "react";
import type { Props } from "#components/ui/Media/types";
import { ImageMedia } from "#components/ui/Media/ImageMedia";
import { VideoMedia } from "#components/ui/Media/VideoMedia";

export const Media: React.FC<Props> = (props) => {
  const { resource } = props;

  const isVideo =
    typeof resource === "object" && resource?.mimeType?.includes("video");

  return isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />;
};
