-- AddForeignKey
ALTER TABLE `AKSES_APLIKASI` ADD CONSTRAINT `AKSES_APLIKASI_AKSES_APLIKASI_fkey` FOREIGN KEY (`AKSES_APLIKASI`) REFERENCES `APLIKASI`(`APLIKASI_ID`) ON DELETE CASCADE ON UPDATE CASCADE;