/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `BlogCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `BlogCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BlogCategory" ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Blog_url_key" ON "Blog"("url");

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategory_url_key" ON "BlogCategory"("url");
