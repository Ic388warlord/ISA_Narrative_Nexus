/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Endpoint` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_name_key" ON "Endpoint"("name");
