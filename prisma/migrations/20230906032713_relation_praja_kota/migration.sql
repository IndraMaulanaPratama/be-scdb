-- AddForeignKey
ALTER TABLE `PRAJA` ADD CONSTRAINT `PRAJA_PRAJA_TEMPAT_LAHIR_fkey` FOREIGN KEY (`PRAJA_TEMPAT_LAHIR`) REFERENCES `KOTA`(`KOTA_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PRAJA` ADD CONSTRAINT `PRAJA_PRAJA_KOTA_fkey` FOREIGN KEY (`PRAJA_KOTA`) REFERENCES `KOTA`(`KOTA_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;