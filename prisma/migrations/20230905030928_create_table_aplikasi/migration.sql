-- CreateTable
CREATE TABLE `APLIKASI` (
    `APLIKASI_ID` VARCHAR(36) NOT NULL,
    `APLIKASI_PENGGUNA` VARCHAR(36) NOT NULL,
    `APLIKASI_NAMA` VARCHAR(255) NOT NULL,
    `APLIKASI_URL` VARCHAR(255) NOT NULL,
    `APLIKASI_CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `APLIKASI_UPDATED_AT` DATETIME(3) NULL,
    `APLIKASI_IS_DELETED` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`APLIKASI_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;