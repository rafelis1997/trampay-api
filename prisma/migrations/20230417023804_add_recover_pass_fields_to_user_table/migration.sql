/*
  Warnings:

  - A unique constraint covering the columns `[recoverPassToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN "recoverPassExp" DATETIME;
ALTER TABLE "users" ADD COLUMN "recoverPassToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_recoverPassToken_key" ON "users"("recoverPassToken");
