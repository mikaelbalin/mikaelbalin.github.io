import React from "react";
import type { Props } from "./types";
import { ImageMedia } from "./ImageMedia";
import { VideoMedia } from "./VideoMedia";
import { Box } from "@mantine/core";

export const Media: React.FC<Props> = (props) => {
  const { resource } = props;

  const isVideo =
    typeof resource === "object" && resource?.mimeType?.includes("video");

  return (
    <Box component={"div"}>
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Box>
  );
};
