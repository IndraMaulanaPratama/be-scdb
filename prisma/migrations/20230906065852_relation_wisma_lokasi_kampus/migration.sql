/*
  Warnings:

  - Added the required column `WISMA_KAMPUS` to the `WISMA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `WISMA` ADD COLUMN `WISMA_KAMPUS` VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `WISMA` ADD CONSTRAINT `WISMA_WISMA_KAMPUS_fkey` FOREIGN KEY (`WISMA_KAMPUS`) REFERENCES `LOKASI_KAMPUS`(`LOKASI_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
