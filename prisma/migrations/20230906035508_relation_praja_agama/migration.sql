-- AddForeignKey
ALTER TABLE `PRAJA` ADD CONSTRAINT `PRAJA_PRAJA_AGAMA_fkey` FOREIGN KEY (`PRAJA_AGAMA`) REFERENCES `AGAMA`(`AGAMA_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
