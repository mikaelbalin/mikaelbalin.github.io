import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";

const isDevelopment = process.env.NODE_ENV === "development";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: isDevelopment
    ? sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || "",
        },
      })
    : vercelPostgresAdapter({
        pool: {
          connectionString: process.env.POSTGRES_URL || "",
        },
      }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
