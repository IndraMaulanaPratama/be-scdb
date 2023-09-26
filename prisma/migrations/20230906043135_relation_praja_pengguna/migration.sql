/*
  Warnings:

  - Added the required column `PRAJA_PENGGUNA` to the `PRAJA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PRAJA_UPDATED_AT` to the `PRAJA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PRAJA` ADD COLUMN `PRAJA_CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `PRAJA_IS_DELETED` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `PRAJA_PENGGUNA` VARCHAR(36) NOT NULL,
    ADD COLUMN `PRAJA_UPDATED_AT` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `PRAJA` ADD CONSTRAINT `PRAJA_PRAJA_PENGGUNA_fkey` FOREIGN KEY (`PRAJA_PENGGUNA`) REFERENCES `PENGGUNA`(`PENGGUNA_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
