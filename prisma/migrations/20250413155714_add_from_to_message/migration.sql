/*
  Warnings:

  - Added the required column `from` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "from" "AccountType" NOT NULL;
