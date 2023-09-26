-- CreateTable
CREATE TABLE `KELURAHAN` (
    `KELURAHAN_ID` VARCHAR(36) NOT NULL,
    `KELURAHAN_NAMA` VARCHAR(200) NOT NULL,
    `KELURAHAN_CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `KELURAHAN_UPDATED_AT` DATETIME(3) NULL,
    `KELURAHAN_IS_DELETED` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`KELURAHAN_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
