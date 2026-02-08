import type React from "react";
import type { PropsWithChildren } from "react";
import { Media } from "#components/ui/Media";
import type { MediaBlock as MediaBlockProps } from "#types/payload";

type Props = PropsWithChildren<MediaBlockProps>;

export const MediaBlock: React.FC<Props> = (props) => {
  const { media, children } = props;

  return (
    <div className="mb-6 sm:mb-8">
      <Media resource={media} />
      {children && <div className="mt-4 text-center">{children}</div>}
    </div>
  );
};
