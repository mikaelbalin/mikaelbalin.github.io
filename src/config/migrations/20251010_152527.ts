import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" RENAME COLUMN "name" TO "username";
  ALTER TABLE "users" DROP COLUMN "password";
  ALTER TABLE "users" DROP COLUMN "first_name";
  ALTER TABLE "users" DROP COLUMN "last_name";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ADD COLUMN "name" varchar;
  ALTER TABLE "users" ADD COLUMN "password" varchar NOT NULL;
  ALTER TABLE "users" ADD COLUMN "first_name" varchar;
  ALTER TABLE "users" ADD COLUMN "last_name" varchar;
  ALTER TABLE "users" DROP COLUMN "username";`)
}
