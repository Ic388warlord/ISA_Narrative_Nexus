-- CreateTable
CREATE TABLE "Story" (
    "id" SERIAL NOT NULL,
    "story" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
