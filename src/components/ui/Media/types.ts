import type { StaticImageData } from "next/image";
import type { Ref } from "react";
import type { Media as MediaType } from "#types/payload";

export interface Props {
  alt?: string;
  className?: string;
  fill?: boolean; // for NextImage only
  onClick?: () => void;
  onLoad?: () => void;
  loading?: "lazy" | "eager"; // for NextImage only
  priority?: boolean; // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>;
  resource?: MediaType | string | number; // for Payload media
  size?: string; // for NextImage only
  src?: StaticImageData; // for static media
}
