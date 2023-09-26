/*
  Warnings:

  - You are about to drop the column `PRAJA_PROGRAM_PENDIDIKAN` on the `PRAJA` table. All the data in the column will be lost.
  - Added the required column `PRAJA_JENJANG_PENDIDIKAN` to the `PRAJA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PRAJA` DROP COLUMN `PRAJA_PROGRAM_PENDIDIKAN`,
    ADD COLUMN `PRAJA_JENJANG_PENDIDIKAN` VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `PRAJA` ADD CONSTRAINT `PRAJA_PRAJA_JENJANG_PENDIDIKAN_fkey` FOREIGN KEY (`PRAJA_JENJANG_PENDIDIKAN`) REFERENCES `JENJANG_PENDIDIKAN`(`JENJANG_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;
