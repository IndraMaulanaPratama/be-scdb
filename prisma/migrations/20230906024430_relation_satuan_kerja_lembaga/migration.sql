-- AddForeignKey
ALTER TABLE `SATUAN_KERJA` ADD CONSTRAINT `SATUAN_KERJA_SATKER_LEMBAGA_fkey` FOREIGN KEY (`SATKER_LEMBAGA`) REFERENCES `LEMBAGA`(`LEMBAGA_ID`) ON DELETE CASCADE ON UPDATE CASCADE;