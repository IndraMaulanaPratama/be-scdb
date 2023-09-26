-- CreateTable
CREATE TABLE `KECAMATAN` (
    `KECAMATAN_ID` VARCHAR(36) NOT NULL,
    `KECAMATAN_NAMA` VARCHAR(200) NOT NULL,
    `KECAMATAN_CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `KECAMATAN_UPDATED_AT` DATETIME(3) NULL,
    `KECAMATAN_IS_DELETED` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`KECAMATAN_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
