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

interface DateMetadata {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface HomePageData {
  data: {
    id: number;
    attributes: DateMetadata & {
      blocks: [HeroProps, AboutProps];
    };
  };
  meta: {};
}

export interface GlobalPageData {
  data: {
    id: number;
    attributes: DateMetadata & {
      header: {
        id: number;
        logoText: Link;
      };
      footer: {
        id: number;
        scrollTexts: [string[], string[]];
        contactsTitle: string;
        email: string;
        phone: string;
        socialTitle: string;
        formTitle: string;
        socialLink: Link[];
      };
    };
  };
}
