/*
  Warnings:

  - Added the required column `price` to the `Addons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Addons" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "price" INTEGER NOT NULL;
