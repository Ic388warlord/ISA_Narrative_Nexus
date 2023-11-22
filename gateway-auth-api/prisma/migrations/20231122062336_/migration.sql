/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `UserRequestCount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserRequestCount_username_key" ON "UserRequestCount"("username");
