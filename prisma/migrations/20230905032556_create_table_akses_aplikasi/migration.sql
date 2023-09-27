-- AlterTable
ALTER TABLE `BIODATA` MODIFY `BIODATA_NAMA` VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE `AKSES_APLIKASI` (
    `AKSES_ID` VARCHAR(36) NOT NULL,
    `AKSES_APLIKASI` VARCHAR(36) NOT NULL,
    `AKSES_PENGGUNA` VARCHAR(36) NOT NULL,
    `AKSES_CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `AKSES_UPDATED_AT` DATETIME(3) NULL,
    `AKSES_IS_DELETED` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`AKSES_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;