-- CreateTable
CREATE TABLE `PANGKAT` (
    `PANGKAT_ID` VARCHAR(36) NOT NULL,
    `PANGKAT_NAMA` VARCHAR(200) NOT NULL,
    `PANGKAT_CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `PANGKAT_UPDATED_AT` DATETIME(3) NULL,
    `PANGKAT_IS_DELETED` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`PANGKAT_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
