-- AddForeignKey
ALTER TABLE `PRAJA` ADD CONSTRAINT `PRAJA_PRAJA_KELURAHAN_fkey` FOREIGN KEY (`PRAJA_KELURAHAN`) REFERENCES `KELURAHAN`(`KELURAHAN_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;