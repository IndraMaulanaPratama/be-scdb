-- CreateTable
CREATE TABLE `BIODATA` (
    `BIODATA_ID` VARCHAR(36) NOT NULL,
    `BIODATA_NAMA` VARCHAR(36) NOT NULL,
    `BIODATA_ALAMAT` TEXT NOT NULL,
    `BIODATA_JENIS_KELAMIN` BOOLEAN NOT NULL,
    `BIODATA_NOMOR_TELPON` VARCHAR(15) NULL,
    `BIODATA_CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `BIODATA_UPDATE_AT` DATETIME(3) NULL,

    PRIMARY KEY (`BIODATA_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;