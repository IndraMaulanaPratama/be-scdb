/*
  Warnings:

  - Added the required column `KECAMATAN_KOTA` to the `KECAMATAN` table without a default value. This is not possible if the table is not empty.
  - Added the required column `KELURAHAN_KECAMATAN` to the `KELURAHAN` table without a default value. This is not possible if the table is not empty.
  - Added the required column `KOTA_PROVINSI` to the `KOTA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PRAJA_ASAL_PENDAFTARAN` to the `PRAJA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `KECAMATAN` ADD COLUMN `KECAMATAN_KOTA` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `KELURAHAN` ADD COLUMN `KELURAHAN_KECAMATAN` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `KOTA` ADD COLUMN `KOTA_PROVINSI` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `PRAJA` ADD COLUMN `PRAJA_ASAL_PENDAFTARAN` VARCHAR(36) NOT NULL;

-- CreateTable
CREATE TABLE `SUKU` (
    `SUKU_ID` VARCHAR(36) NOT NULL,
    `SUKU_NAMA` VARCHAR(200) NOT NULL,
    `SUKU_CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `SUKU_UPDATED_AT` DATETIME(3) NULL,
    `SUKU_IS_DELETED` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`SUKU_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
