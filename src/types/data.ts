export interface DataLink {
  id: number;
  url: string;
  text: string;
  isExternal: boolean;
}

interface FormControl {
  id: number;
  label: string;
  description: null | string;
  placeholder: string;
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
      sections: [HeroProps, AboutProps];
    };
  };
  meta: {};
}

export interface UsersPermissionsUser extends DateMetadata {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  locale: null | string;
}

export interface GetUserMeLoaderResult {
  ok: boolean;
  data: UsersPermissionsUser | null;
  error: any | null;
}

export interface HeaderProps {
  id: number;
  logoText: DataLink;
  navLinks: DataLink[];
  user?: GetUserMeLoaderResult;
}

export interface ContactFormProps {
  id: number;
  title: string;
  message: FormControl;
  email: FormControl;
  name: FormControl;
}

export interface ContactProps {
  contacts: {
    id: number;
    title: string;
    email: string;
    phone: string;
  };
  social: {
    id: number;
    title: string;
    socialLink: DataLink[];
  };
  form: ContactFormProps;
}

export interface FooterProps extends ContactProps {
  id: number;
  titles: [string[], string[]];
}

interface SubscriptionProps {
  id: number;
  title: string;
  text: string;
  button: string;
  email: FormControl;
}

export interface GlobalPageData extends DateMetadata {
  id: number;
  documentId: string;
  locale: string;
  header: HeaderProps;
  footer: FooterProps;
  subscription: SubscriptionProps;
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
