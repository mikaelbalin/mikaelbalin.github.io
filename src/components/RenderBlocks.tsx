import React from "react";
import type { AboutBlock, Page,  ReusableBlockType } from "#types/payload";
import { Archive, type ArchiveBlockProps } from "#components/Archive";
import { Subscription } from "#components/Subscription";
import { About } from "#components/About";
import { Search, type SearchBlockProps } from "#components/Search";
import { TextContent, type ContentBlockProps } from "#components/TextContent";

type Block = Page["layout"][0];
type BlockType = Extract<Block, { blockType: string }>["blockType"];

const blockComponents: Record<
  BlockType,
  | React.FC<AboutBlock>
  | React.FC<ArchiveBlockProps>
  | React.FC<ReusableBlockType>
  | React.FC<SearchBlockProps>
  | React.FC<ContentBlockProps>
> = {
  about: About,
  archive: Archive,
  reusableBlock: Subscription,
  search: Search,
  content: TextContent,
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
          return <Block key={index} {...block} {...rest} locale={locale} />;
        }
        if (blockType === "content" && Block === TextContent) {
          return <Block key={index} {...block} />;
        }

        return null;
      })}
    </>
  );
};
