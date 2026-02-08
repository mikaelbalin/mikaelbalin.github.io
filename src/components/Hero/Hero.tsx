import type React from "react";
import { HeroBlog } from "#components/Hero/HeroBlog";
import { HeroMain } from "#components/Hero/HeroMain";
import { HeroSimple } from "#components/Hero/HeroSimple";
import type { Page } from "#types/payload";

type RenderHeroProps = Page["hero"];

const heroes: Record<RenderHeroProps["type"], React.FC<Page["hero"]>> = {
  main: HeroMain,
  blog: HeroBlog,
  simple: HeroSimple,
};

export const Hero: React.FC<RenderHeroProps> = (props) => {
  const { type } = props;

  if (!type) return null;

  const HeroToRender = heroes[type];

  if (!HeroToRender) return null;

  return <HeroToRender {...props} />;
};
