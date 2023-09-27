-- CreateTable
CREATE TABLE `LOKASI_KAMPUS` (
    `LOKASI_ID` VARCHAR(36) NOT NULL,
    `LOKASI_NAMA` VARCHAR(200) NOT NULL,
    `LOKASI_ALAMAT` TEXT NOT NULL,
    `LOKASI_CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `LOKASI_UPDATED_AT` DATETIME(3) NULL,
    `LOKASI_IS_DELETED` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`LOKASI_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;