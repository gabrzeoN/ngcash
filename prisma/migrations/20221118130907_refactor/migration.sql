/*
  Warnings:

  - You are about to drop the column `creditedAccountId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `debitedAccountId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creditedAccountId` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `debitedAccountId` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_creditedAccountId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_debitedAccountId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- DropIndex
DROP INDEX "accounts_userId_key";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "creditedAccountId",
DROP COLUMN "debitedAccountId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "creditedAccountId" INTEGER NOT NULL,
ADD COLUMN     "debitedAccountId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
ADD COLUMN     "accountId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_accountId_key" ON "users"("accountId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_debitedAccountId_fkey" FOREIGN KEY ("debitedAccountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_creditedAccountId_fkey" FOREIGN KEY ("creditedAccountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
