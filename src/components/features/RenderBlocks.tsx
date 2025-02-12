import React from "react";
import type {
  AboutBlock,
  Page,
  ArchiveBlock as TArchiveBlock,
  ReusableBlock,
} from "@/types/payload";
import { ArchiveBlock } from "@/components/features/ArchiveBlock";
import { Subscription } from "@/components/features/Subscription";
import { About } from "@/components/features/About";

type Block = Page["layout"][0];
type BlockType = Extract<Block, { blockType: string }>["blockType"];

const blockComponents: Record<
  BlockType,
  React.FC<AboutBlock> | React.FC<TArchiveBlock> | React.FC<ReusableBlock>
> = {
  about: About,
  archive: ArchiveBlock,
  reusableBlock: Subscription,
};

type RenderBlocksProps = {
  blocks: Block[];
};

export const RenderBlocks: React.FC<RenderBlocksProps> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (!hasBlocks) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const { blockType } = block;

        const Block = blockComponents[blockType];

        if (blockType === "archive" && Block === ArchiveBlock) {
          return <Block key={index} {...block} />;
        }
        if (blockType === "about" && Block === About) {
          return <Block key={index} {...block} />;
        }
        if (blockType === "reusableBlock" && Block === Subscription) {
          return <Block key={index} {...block} />;
        }

        return null;
      })}
    </>
  );
};
