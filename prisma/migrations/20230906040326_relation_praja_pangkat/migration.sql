-- AddForeignKey
ALTER TABLE `PRAJA` ADD CONSTRAINT `PRAJA_PRAJA_PANGKAT_fkey` FOREIGN KEY (`PRAJA_PANGKAT`) REFERENCES `PANGKAT`(`PANGKAT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;
