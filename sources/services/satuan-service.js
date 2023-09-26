import { connection } from "../core/connection.js";
import { ErrorResponse, consoleError } from "../utils/index.js";
import { v4 as uuid } from "uuid";
import { } from "../validations/index.js"




/**
 * Fungsi pikeun milarian data satuan dumasar kana id
 * @param id 
 * @returns 
 */

export const getSatuanById = async (id) => {

    // milarian data Satuan dumasar kana id
    const result = await connection.sATUAN.findFirst({
        select: { SATUAN_ID: true, SATUAN_NAMA: true, SATUAN_IS_DELETED: true },
        where: { SATUAN_ID: id }
    })

    // mulangkeun hasil pogog ka semah
    if (null == result) {
        consoleError(`Data Satuan dengan id ${id} tidak ditemukan`, result)
        throw new ErrorResponse(404, `Data Satuan tidak ditemukan`)
    }

    // nyanggakeun data Satuan nu kapendak
    return result
}