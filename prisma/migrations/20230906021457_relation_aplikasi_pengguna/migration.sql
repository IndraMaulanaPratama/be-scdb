/*
  Warnings:

  - You are about to drop the column `APLIKASI_PENGGUNA` on the `APLIKASI` table. All the data in the column will be lost.
  - Added the required column `APLIKASI_ADMIN` to the `APLIKASI` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `APLIKASI` DROP COLUMN `APLIKASI_PENGGUNA`,
    ADD COLUMN `APLIKASI_ADMIN` VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `APLIKASI` ADD CONSTRAINT `APLIKASI_APLIKASI_ADMIN_fkey` FOREIGN KEY (`APLIKASI_ADMIN`) REFERENCES `PENGGUNA`(`PENGGUNA_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
