/*
  Warnings:

  - Added the required column `cardNumber` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "cardNumber" TEXT NOT NULL;
