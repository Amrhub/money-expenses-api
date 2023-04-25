-- CreateEnum
CREATE TYPE "BillType" AS ENUM ('ONCE', 'MONTHLY', 'YEARLY');

-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "type" "BillType" NOT NULL DEFAULT 'ONCE',

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);
