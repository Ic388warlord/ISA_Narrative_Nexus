-- CreateTable
CREATE TABLE "UserRequestCount" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "UserRequestCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endpoint" (
    "id" SERIAL NOT NULL,
    "method" "HttpMethod" NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Endpoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRequestCount" ADD CONSTRAINT "UserRequestCount_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
