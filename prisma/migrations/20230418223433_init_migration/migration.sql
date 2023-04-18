-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "recoverPassToken" TEXT,
    "recoverPassExp" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "userDocument" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_document_key" ON "users"("document");

-- CreateIndex
CREATE UNIQUE INDEX "users_recoverPassToken_key" ON "users"("recoverPassToken");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userDocument_fkey" FOREIGN KEY ("userDocument") REFERENCES "users"("document") ON DELETE RESTRICT ON UPDATE CASCADE;
