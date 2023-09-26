import { connection } from "../core/connection.js";
import { v4 as uuid } from "uuid";

export const logger = async (pengguna, kegiatan, status, keterangan = null) => {
    await connection.lOGGER.create({
        data: {
            LOG_ID: uuid(),
            LOG_PENGGUNA: pengguna,
            LOG_KEGIATAN: kegiatan,
            LOG_STATUS: status,
            LOG_KETERANGAN: keterangan
        }
    })
}