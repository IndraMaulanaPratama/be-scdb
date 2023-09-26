import { connection } from "../core/connection.js";
import { ErrorResponse, consoleError } from "../utils/index.js";
import { v4 as uuid } from "uuid";
import { } from "../validations/index.js"




/**
 * Fungsi pikeun milarian data biro dumasar kana id
 * @param id 
 * @returns 
 */

export const getBiroById = async (id) => {

    // milarian data Biro dumasar kana id
    const result = await connection.bIRO.findFirst({
        select: { BIRO_ID: true, BIRO_NAMA: true, BIRO_IS_DELETED: true },
        where: { BIRO_ID: id }
    })

    // mulangkeun hasil pogog ka semah
    if (null == result) {
        consoleError(`Data Biro dengan id ${id} tidak ditemukan`, result)
        throw new ErrorResponse(404, `Data Biro tidak ditemukan`)
    }

    // nyanggakeun data Biro nu kapendak
    return result
}