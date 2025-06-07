/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Request` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Request_id_key" ON "Request"("id");
