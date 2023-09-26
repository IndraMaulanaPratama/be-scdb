/*
  Warnings:

  - Added the required column `BIODATA_PENGGUNA` to the `BIODATA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BIODATA` ADD COLUMN `BIODATA_PENGGUNA` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `BIODATA` ADD CONSTRAINT `BIODATA_BIODATA_PENGGUNA_fkey` FOREIGN KEY (`BIODATA_PENGGUNA`) REFERENCES `PENGGUNA`(`PENGGUNA_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
