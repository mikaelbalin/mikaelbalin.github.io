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

interface Seo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: null;
  metaRobots: null;
  structuredData: null;
  metaViewport: null;
  canonicalURL: null;
}

export interface StrapiMetadata {
  data: {
    id: number;
    attributes: DateMetadata & {
      seo: Seo;
    };
  };
}

interface TagResponseDataObject {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
}

export interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export interface Article {
  title: string;
  slug: string;
  tags: {
    data: TagResponseDataObject[];
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface ArticleListResponseDataItem {
  id: string;
  attributes: Article;
}

export interface ArticleListResponse {
  data: ArticleListResponseDataItem[];
  meta: Meta;
}

interface Tag {
  name: string;
  slug: string;
}

export interface TagListResponseDataItem {
  id: number;
  attributes: Tag;
}

export interface TagListResponse {
  data: TagListResponseDataItem[];
  meta: Meta;
}
