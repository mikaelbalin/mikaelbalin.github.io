import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  DROP INDEX "reusable_blocks_blocks_form_block_locales_locale_parent_id_unique";
  DROP INDEX "reusable_blocks_blocks_subscription_locales_locale_parent_id_unique";
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_form_block_locales_locale_parent_id_u" ON "reusable_blocks_blocks_form_block_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_subscription_locales_locale_parent_id" ON "reusable_blocks_blocks_subscription_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_kv" CASCADE;
  DROP INDEX "reusable_blocks_blocks_form_block_locales_locale_parent_id_u";
  DROP INDEX "reusable_blocks_blocks_subscription_locales_locale_parent_id";
  CREATE UNIQUE INDEX "reusable_blocks_blocks_form_block_locales_locale_parent_id_unique" ON "reusable_blocks_blocks_form_block_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "reusable_blocks_blocks_subscription_locales_locale_parent_id_unique" ON "reusable_blocks_blocks_subscription_locales" USING btree ("_locale","_parent_id");`)
}
