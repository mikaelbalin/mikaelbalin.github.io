import { categories } from "#config/collections/categories";
import { media } from "#config/collections/media";
import { pages } from "#config/collections/pages";
import { posts } from "#config/collections/posts";
import { reusableBlocks } from "#config/collections/reusableBlocks";
import { subscribers } from "#config/collections/subscribers";
import { users } from "#config/collections/users";
import { defaultLexical } from "#config/fields/defaultLexical";
import { footer } from "#config/globals/footer";
import { header } from "#config/globals/header";
import { migrations } from "#config/migrations";
import { plugins } from "#config/plugins";
import { i18n } from "#i18n-config";
import { getServerSideURL } from "#lib/getURL";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

const isDevelopment = process.env.NODE_ENV === "development";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  localization: {
    defaultLocale: i18n.defaultLocale,
    locales: [...i18n.locales],
  },
  // GraphQL configuration with GraphiQL instead of default playground
  graphQL: {
    // Disable the default GraphQL playground - we use our custom GraphiQL instead
    disablePlaygroundInProduction: true,
    // Also disable playground in development since we have our custom GraphiQL
    disable: false, // Keep GraphQL API enabled
    // Enable introspection for GraphiQL in development, disable in production for security
    disableIntrospectionInProduction: true,
    // Set reasonable complexity limits for GraphiQL exploration
    maxComplexity: 100,
    // Output schema file for reference and GraphiQL schema introspection
    schemaOutputFile: "schema.graphql",
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
    user: users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
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
  globals: [header, footer],
  collections: [
    pages,
    posts,
    users,
    media,
    categories,
    reusableBlocks,
    subscribers,
  ],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "types/payload.ts"),
  },
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
          min: 0, // No persistent connections for static generation
          max: 5, // Reduced pool size for static generation
          idleTimeoutMillis: 30000, // Shorter idle timeout
          connectionTimeoutMillis: 5000, // Faster timeout for failed connections
        },
        migrationDir: path.resolve(dirname, "config/migrations"),
      }),
  sharp,
  plugins,
  cors: [getServerSideURL()].filter(Boolean),
  csrf: [getServerSideURL()].filter(Boolean),
  email: resendAdapter({
    defaultFromAddress: "notifications@updates.mikaelbalin.com",
    defaultFromName: "Mikael Balin",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
});
