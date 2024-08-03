import Image, { ImageProps } from "next/image";
import { getStrapiMedia } from "@/lib/utils";

interface StrapiImageProps
  extends Pick<ImageProps, "alt" | "height" | "width" | "className"> {
  src: string;
}

export function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
}: Readonly<StrapiImageProps>) {
  if (!src) return null;
  const imageUrl = getStrapiMedia(src);
  const imageFallback = `https://placehold.co/${width}x${height}`;

  return (
    <Image
      src={imageUrl ?? imageFallback}
      alt={alt}
      height={height}
      width={width}
      className={className}
    />
  );
}
