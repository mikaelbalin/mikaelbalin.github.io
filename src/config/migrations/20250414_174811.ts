import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_content_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_locales" ADD CONSTRAINT "pages_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_locales" ADD CONSTRAINT "_pages_v_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_content_locales_locale_parent_id_unique" ON "pages_blocks_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_content_locales_locale_parent_id_unique" ON "_pages_v_blocks_content_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "content";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_content_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_content_locales" CASCADE;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "content" jsonb;`)
}
