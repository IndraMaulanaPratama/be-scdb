/*
  Warnings:

  - You are about to drop the column `SATKER_NAME` on the `SATUAN_KERJA` table. All the data in the column will be lost.
  - Added the required column `SATKER_NAMA` to the `SATUAN_KERJA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SATUAN_KERJA` DROP COLUMN `SATKER_NAME`,
    ADD COLUMN `SATKER_NAMA` VARCHAR(200) NOT NULL;
