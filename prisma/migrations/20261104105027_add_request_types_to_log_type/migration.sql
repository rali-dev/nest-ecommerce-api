/*
  Warnings:

  - The values [error] on the enum `LogType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LogType_new" AS ENUM ('ERROR', 'POST', 'PUT', 'PATCH', 'DELETE');
ALTER TABLE "Log" ALTER COLUMN "type" TYPE "LogType_new" USING ("type"::text::"LogType_new");
ALTER TYPE "LogType" RENAME TO "LogType_old";
ALTER TYPE "LogType_new" RENAME TO "LogType";
DROP TYPE "public"."LogType_old";
COMMIT;
