interface Link {
  id: number;
  url: string;
  text: string;
  isExternal: boolean;
}

export interface HeroProps {
  id: number;
  heading: string[];
  description: string;
  location: string;
  link: Link;
  __component: "layout.hero-section";
}

export interface AboutProps {
  id: number;
  heading: string;
  text: string;
  __component: "layout.about-section";
}

export interface HomePageData {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      blocks: [HeroProps, AboutProps];
    };
  };
  meta: {};
}
