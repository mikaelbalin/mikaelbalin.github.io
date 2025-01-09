import React from "react";
import type { Page } from "@/types/payload";
import { ArchiveBlock } from "@/components/features/ArchiveBlock";
import { Subscription } from "@/components/features/Subscription";
import { MediaBlock } from "@/components/ui/MediaBlock";
import { About } from "@/components/features/About";

type BlockType = Extract<Page["layout"][0], { blockType: string }>["blockType"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockComponents: Record<BlockType, React.FC<any>> = {
  about: About,
  archive: ArchiveBlock,
  subscription: Subscription,
  mediaBlock: MediaBlock,
};

type RenderBlocksProps = {
  blocks: Page["layout"][0][];
};

export const RenderBlocks: React.FC<RenderBlocksProps> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return <Block key={index} {...block} />;
            }
          }

          return null;
        })}
      </>
    );
  }

  return null;
};
