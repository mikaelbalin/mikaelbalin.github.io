import type React from "react";
import { About } from "#components/About";
import { Archive, type ArchiveBlockProps } from "#components/Archive";
import { Search, type SearchBlockProps } from "#components/Search";
import { Subscription } from "#components/Subscription";
import { type ContentBlockProps, TextContent } from "#components/TextContent";
import type { AboutBlock, Page, ReusableBlockType } from "#types/payload";

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
      {blocks.map((block) => {
        const { blockType, id } = block;

        const Block = blockComponents[blockType];

        if (blockType === "archive" && Block === Archive) {
          return <Block key={id} {...block} locale={locale} />;
        }
        if (blockType === "about" && Block === About) {
          return <Block key={id} {...block} />;
        }
        if (blockType === "reusableBlock" && Block === Subscription) {
          return <Block key={id} {...block} />;
        }
        if (blockType === "search" && Block === Search) {
          return <Block key={id} {...block} {...rest} locale={locale} />;
        }
        if (blockType === "content" && Block === TextContent) {
          return <Block key={id} {...block} />;
        }

        return null;
      })}
    </>
  );
};
