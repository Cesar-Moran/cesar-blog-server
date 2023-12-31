/*
  Warnings:

  - Added the required column `short_description` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "short_description" TEXT NOT NULL;
