import React from "react";
import type { Page } from "@/types/payload";
import { HeroMain } from "@/components/features/Hero/HeroMain";
import { HeroBlog } from "@/components/features/Hero/HeroBlog";

type RenderHeroProps = Page["hero"];

const heroes: Record<RenderHeroProps["type"], React.FC<Page["hero"]>> = {
  main: HeroMain,
  blog: HeroBlog,
};

export const Hero: React.FC<RenderHeroProps> = (props) => {
  const { type } = props;

  if (!type) return null;

  const HeroToRender = heroes[type];

  if (!HeroToRender) return null;

  return <HeroToRender {...props} />;
};
