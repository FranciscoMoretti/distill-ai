/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Secret` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Secret_name_key" ON "Secret"("name");
