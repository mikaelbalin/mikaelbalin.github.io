import React from "react";
import type { Page } from "@/payload-types";
import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { About } from "@/components/features/About";

type BlockType = Extract<Page["layout"][0], { blockType: string }>["blockType"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockComponents: Record<BlockType, React.FC<any>> = {
  archive: ArchiveBlock,
  about: About,
  cta: CallToActionBlock,
  formBlock: FormBlock,
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
              return (
                <div className="my-16" key={index}>
                  <Block {...block} />
                </div>
              );
            }
          }
          return null;
        })}
      </>
    );
  }

  return null;
};
