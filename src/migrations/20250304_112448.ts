import {
  MigrateUpArgs,
  MigrateDownArgs,
  sql,
} from "@payloadcms/db-vercel-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ 
   BEGIN 
     IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages' AND column_name='title') THEN
       ALTER TABLE "pages" ADD COLUMN "title" varchar;
     END IF;
     IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v' AND column_name='version_title') THEN
       ALTER TABLE "_pages_v" ADD COLUMN "version_title" varchar;
     END IF;
     IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='title') THEN
       ALTER TABLE "posts" ADD COLUMN "title" varchar;
     END IF;
     IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_posts_v' AND column_name='version_title') THEN
       ALTER TABLE "_posts_v" ADD COLUMN "version_title" varchar;
     END IF;
   END $$;

  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_locales" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "posts_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v_locales" DROP COLUMN IF EXISTS "version_title";`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_title";`);
}
