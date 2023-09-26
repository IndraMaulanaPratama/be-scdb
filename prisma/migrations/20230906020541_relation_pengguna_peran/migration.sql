/*
  Warnings:

  - You are about to drop the column `PENGGUNA_ROLE` on the `PENGGUNA` table. All the data in the column will be lost.
  - Added the required column `PENGGUNA_PERAN` to the `PENGGUNA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PENGGUNA` DROP COLUMN `PENGGUNA_ROLE`,
    ADD COLUMN `PENGGUNA_PERAN` VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `PENGGUNA` ADD CONSTRAINT `PENGGUNA_PENGGUNA_PERAN_fkey` FOREIGN KEY (`PENGGUNA_PERAN`) REFERENCES `PERAN`(`PERAN_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
