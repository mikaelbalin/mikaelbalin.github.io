import React from "react";
import type { AboutBlock, Page, ReusableBlock } from "@/types/payload";
import { Archive, ArchiveBlockProps } from "@/components/features/Archive";
import { Subscription } from "@/components/features/Subscription";
import { About } from "@/components/features/About";
import { Search, SearchBlockProps } from "@/components/features/Search";

type Block = Page["layout"][0];
type BlockType = Extract<Block, { blockType: string }>["blockType"];

const blockComponents: Record<
  BlockType,
  | React.FC<AboutBlock>
  | React.FC<ArchiveBlockProps>
  | React.FC<ReusableBlock>
  | React.FC<SearchBlockProps>
> = {
  about: About,
  archive: Archive,
  reusableBlock: Subscription,
  search: Search,
};

type RenderBlocksProps = {
  blocks: Block[];
  locale: "en" | "pt" | "all";
  category: string;
  page: unknown;
};

export const RenderBlocks: React.FC<RenderBlocksProps> = (props) => {
  const { blocks, locale, ...rest } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (!hasBlocks) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const { blockType } = block;

        const Block = blockComponents[blockType];

        if (blockType === "archive" && Block === Archive) {
          return <Block key={index} {...block} locale={locale} />;
        }
        if (blockType === "about" && Block === About) {
          return <Block key={index} {...block} />;
        }
        if (blockType === "reusableBlock" && Block === Subscription) {
          return <Block key={index} {...block} />;
        }
        if (blockType === "search" && Block === Search) {
          return <Block key={index} {...block} {...rest} />;
        }

        return null;
      })}
    </>
  );
};
