-- AddForeignKey
ALTER TABLE `KECAMATAN` ADD CONSTRAINT `KECAMATAN_KECAMATAN_KOTA_fkey` FOREIGN KEY (`KECAMATAN_KOTA`) REFERENCES `KOTA`(`KOTA_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
