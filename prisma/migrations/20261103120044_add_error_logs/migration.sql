-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('error');

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "LogType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
