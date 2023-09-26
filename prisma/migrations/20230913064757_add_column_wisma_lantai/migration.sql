/*
  Warnings:

  - Added the required column `WISMA_LANTAI` to the `WISMA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `WISMA` ADD COLUMN `WISMA_LANTAI` INTEGER NOT NULL;
