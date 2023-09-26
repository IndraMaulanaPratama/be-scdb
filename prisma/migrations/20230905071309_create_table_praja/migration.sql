-- CreateTable
CREATE TABLE `PRAJA` (
    `PRAJA_NPP` VARCHAR(7) NOT NULL,
    `PRAJA_NOMOR_INDUK_KEPENDUDUKAN` VARCHAR(16) NOT NULL,
    `PRAJA_NAMA` VARCHAR(200) NOT NULL,
    `PRAJA_TEMPAT_LAHIR` VARCHAR(100) NOT NULL,
    `PRAJA_TANGGAL_LAHIR` VARCHAR(50) NOT NULL,
    `PRAJA_PROVINSI` VARCHAR(36) NOT NULL,
    `PRAJA_KOTA` VARCHAR(36) NOT NULL,
    `PRAJA_KECAMATAN` VARCHAR(36) NOT NULL,
    `PRAJA_KELURAHAN` VARCHAR(36) NOT NULL,
    `PRAJA_ALAMAT` VARCHAR(255) NOT NULL,
    `PRAJA_SUKU` VARCHAR(36) NOT NULL,
    `PRAJA_JENIS_KELAMIN` BOOLEAN NOT NULL,
    `PRAJA_AGAMA` VARCHAR(36) NOT NULL,
    `PRAJA_ANGKATAN` VARCHAR(36) NOT NULL,
    `PRAJA_PROGRAM_PENDIDIKAN` VARCHAR(36) NOT NULL,
    `PRAJA_PROGRAM_STUDI` VARCHAR(36) NOT NULL,
    `PRAJA_KELAS` VARCHAR(36) NOT NULL,
    `PRAJA_PANGKAT` VARCHAR(36) NOT NULL,
    `PRAJA_LOKASI_KAMPUS` VARCHAR(36) NOT NULL,
    `PRAJA_LOKASI_KAMPUS_MUDA` VARCHAR(36) NULL,
    `PRAJA_LOKASI_KAMPUS_MADYA` VARCHAR(36) NULL,
    `PRAJA_LOKASI_KAMPUS_WASANA` VARCHAR(36) NULL,
    `PRAJA_WISMA` VARCHAR(36) NULL,
    `PRAJA_NAMA_AYAH` VARCHAR(150) NOT NULL,
    `PRAJA_PEKERJAAN_AYAH` VARCHAR(200) NULL,
    `PRAJA_NAMA_IBU` VARCHAR(150) NOT NULL,
    `PRAJA_PEKERJAAN_IBU` VARCHAR(200) NULL,
    `PRAJA_FOTO` VARCHAR(255) NULL,

    PRIMARY KEY (`PRAJA_NPP`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
