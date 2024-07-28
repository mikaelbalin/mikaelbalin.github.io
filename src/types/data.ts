export interface DataLink {
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
  link: DataLink;
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

export interface HeaderProps {
  id: number;
  logoText: DataLink;
}

export interface ContactProps {
  contactsTitle: string;
  email: string;
  phone: string;
  socialTitle: string;
  socialLink: DataLink[];
  formTitle: string;
}

export interface FooterProps extends ContactProps {
  id: number;
  scrollTexts: [string[], string[]];
}

export interface GlobalPageData {
  data: {
    id: number;
    attributes: DateMetadata & {
      header: HeaderProps;
      footer: FooterProps;
    };
  };
}
