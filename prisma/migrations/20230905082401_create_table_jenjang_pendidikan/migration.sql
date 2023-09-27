-- CreateTable
CREATE TABLE `JENJANG_PENDIDIKAN` (
    `JENJANG_ID` VARCHAR(36) NOT NULL,
    `JENJANG_NAMA` VARCHAR(200) NOT NULL,
    `JENJANG_CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `JENJANG_UPDATED_AT` DATETIME(3) NULL,
    `JENJANG_IS_DELETED` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`JENJANG_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;