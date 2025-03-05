import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { plugins } from "./config/plugins/index.js";
import { getServerSideURL } from "@/utilities/getURL";
import { categories } from "./config/collections/categories";
import { media } from "./config/collections/media";
import { posts } from "./config/collections/posts";
import { users } from "./config/collections/users";
import { pages } from "./config/collections/pages";
import { subscribers } from "./config/collections/subscribers";
import { footer } from "./config/globals/footer";
import { header } from "./config/globals/header";
import { defaultLexical } from "./config/fields/defaultLexical";
import { i18n } from "@/i18n-config";
import { reusableBlocks } from "./config/collections/reusableBlocks";
import { migrations } from "./migrations";

const isDevelopment = process.env.NODE_ENV === "development";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  localization: {
    defaultLocale: i18n.defaultLocale,
    locales: [...i18n.locales],
  },
  admin: {
    // https://payloadcms.com/docs/admin/components#root-components
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ["@/components/admin/BeforeLogin"],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: [],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: users.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
    meta: {
      icons: [
        {
          type: "favicon",
          url: "/favicon.ico",
        },
      ],
    },
  },
  editor: defaultLexical,
  db: isDevelopment
    ? postgresAdapter({
        pool: {
          connectionString: process.env.POSTGRES_URL || "",
        },
      })
    : vercelPostgresAdapter({
        prodMigrations: migrations,
        pool: {
          connectionString: process.env.POSTGRES_URL || "",
          min: 0,
          max: 5,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 10000,
        },
      }),
  globals: [header, footer],
  collections: [
    pages,
    posts,
    media,
    categories,
    users,
    subscribers,
    reusableBlocks,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  plugins,
  // Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "types/payload.ts"),
  },
  email: resendAdapter({
    defaultFromAddress: "notifications@updates.mikaelbalin.com",
    defaultFromName: "Mikael Balin",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
});
