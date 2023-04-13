-- CreateTable
CREATE TABLE "Receipt" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "items" JSONB[],
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_name_userId_key" ON "Receipt"("name", "userId");
