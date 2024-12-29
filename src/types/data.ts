export interface DataLink {
  id?: number;
  url: string;
  text: string;
  isExternal?: boolean | null;
}

interface FormControl {
  id: number;
  label: string;
  description: null | string;
  placeholder: string;
}

interface DateMetadata {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AboutProps {
  id: number;
  title: string;
  description: string;
}

export interface PostLatestProps {
  latestPostsTitle: string;
  latestPostsLink: DataLink;
}

export interface HomePageData extends DateMetadata, PostLatestProps {
  id: number;
  documentId: string;
  locale: string;
  about: AboutProps;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any | null;
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
  navigation: {
    id: number;
    title: string;
    topButton: string;
    navLinks: DataLink[];
  };
}

export interface SubscriptionFormProps {
  button: string;
  email: FormControl;
}

export interface SubscriptionProps extends SubscriptionFormProps {
  id: number;
  title: string;
  text: string;
}

export interface GlobalPageData extends DateMetadata {
  id: number;
  documentId: string;
  locale: string;
  footer: FooterProps;
}

export interface SubscriptionResponse extends DateMetadata {
  id: number;
  documentId: string;
  locale: string;
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

interface TagResponseDataObject extends DateMetadata {
  id: number;
  documentId: string;
  locale: null;
  name: string;
  slug: string;
}

export interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export interface Post extends DateMetadata {
  id: number;
  documentId: string;
  title: string;
  locale: string;
  timeToRead: number;
  slug: string;
  tags: TagResponseDataObject[];
}

export interface PostListResponse {
  data: Post[];
  meta: Meta;
}

export interface Tag extends DateMetadata {
  id: number;
  documentId: string;
  locale: null;
  name: string;
  slug: string;
}

export interface TagListResponse {
  data: Tag[];
  meta: Meta;
}

export interface RichTextBlock {
  __component: "shared.rich-text";
  id: number;
  body: string;
}

export interface CalloutBlock {
  __component: "shared.callout";
  id: number;
  type: "note" | "tip" | "important";
  body: string;
  title: string;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  locale: string;
  timeToRead: number;
  slug: string;
  tags: Tag[];
  blocks: (RichTextBlock | CalloutBlock)[];
  localizations: [];
}

export interface ArticleResponseDataObject extends DateMetadata {
  data: Article[];
  meta: Meta;
}
