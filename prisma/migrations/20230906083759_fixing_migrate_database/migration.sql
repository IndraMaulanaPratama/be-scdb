/*
  Warnings:

  - You are about to drop the column `BIODATA_NOMOR_TELPON` on the `BIODATA` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `BIODATA` DROP COLUMN `BIODATA_NOMOR_TELPON`,
    ADD COLUMN `BIODATA_NOMOR_TELEPON` VARCHAR(15) NULL;
