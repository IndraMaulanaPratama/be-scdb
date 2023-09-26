import { connection } from "../core/connection.js"
import { consoleError, consoleInfo, consoleWarn } from "../utils/custom-logger/logger-util.js";
import { ErrorResponse } from "../utils/error-response/error-response-util.js";
import { v4 as uuid } from "uuid";
import { validate, addNewSatkerValidation } from "../validations/index.js";
import {
    validateStatus,
    getLembagaById,
    getFakultasById,
    getBiroById,
    getSatuanById
} from "./index.js"



/**
 * Fungsi kanggo maca data anu luyu sareng status anu di suhunkeun
 * @param status 
 * @returns 
 */

const getallSatKer = async (status) => {
    // miwarang sistem marios status anu di eusian ku semah
    const resultStatus = validateStatus(status)

    // milarian data satuan kerja dumasar kana status anu dikintun ku semah
    return await connection.sATUAN_KERJA.findMany({
        select: {
            SATKER_ID: true,

            LEMBAGA: {
                select: {
                    LEMBAGA_ID: true,
                    LEMBAGA_NAMA: true,
                    LEMBAGA_IS_DELETED: true,
                }
            },

            FAKULTAS: {
                select: {
                    FAKULTAS_ID: true,
                    FAKULTAS_NAMA: true,
                    FAKULTAS_IS_DELETED: true,
                }
            },

            BIRO: {
                select: {
                    BIRO_ID: true,
                    BIRO_NAMA: true,
                    BIRO_IS_DELETED: true,
                }
            },

            SATUAN: {
                select: {
                    SATUAN_ID: true,
                    SATUAN_NAMA: true,
                    SATUAN_IS_DELETED: true,
                }
            }
        },

        where: {
            OR: [
                { LEMBAGA: { LEMBAGA_IS_DELETED: resultStatus } },
                { FAKULTAS: { FAKULTAS_IS_DELETED: resultStatus } },
                { BIRO: { BIRO_IS_DELETED: resultStatus } },
                { SATUAN: { SATUAN_IS_DELETED: resultStatus } },
            ]
        }
    })
}




/**
 * Fungsi kanggo milari data satuan kerja dumasar kana id
 * @param id 
 * @returns 
 */

const getSatkerById = async (id) => {
    // milari data satuan kerja dumasar kana id
    const result = await connection.sATUAN_KERJA.findFirst({
        select: {
            SATKER_ID: true,
            SATKER_NAMA: true,
        },

        where: { SATKER_ID: id }
    })

    if (null == result) {
        consoleError(`Data satuan kerja dengan id ${id} tidak ditemukan`, result)
        throw new ErrorResponse(204, `Data Satuan Kerja tidak ditemukan`)
    }

    return result
}




/**
 * Fungsi kanggo marios data mandatory
 * @param {lembaga, fakultas, biro, satuan, nama} data 
 */

const checkDataMandatory = async (data) => {
    // nangtoskeun istilah
    const { lembaga, fakultas, biro, satuan, nama } = data
    let option = {}

    // mulangkeun hasil pogog kumargi data teu sesuai sareng katangtosan service
    if (
        null == lembaga &&
        null == fakultas &&
        null == biro &&
        null == satuan
    ) {
        throw new ErrorResponse(400, `Invalid data validation`)
    }

    // marios data lembaga anu dimaksad ku semah
    if (null != lembaga) {
        await getLembagaById(lembaga, `aktif`)
        option.value = lembaga
    }

    // marios data fakultas anu dimaksad ku semah
    if (null != fakultas) {
        await getFakultasById(fakultas)
        option.value = fakultas
    }

    // marios data biro anu dimaksad ku semah
    if (null != biro) {
        await getBiroById(biro)
        option.value = biro
    }

    // marios data satuan anu dimaksad ku semah
    if (null != satuan) {
        await getSatuanById(satuan)
        option.value = satuan
    }

    // marios manawi data tos sayogi dina database
    const checkData = await checkDuplicated(option.value)

    // ngadugikeun hasil pogog kusabab duplikat data
    if (true != checkData) {
        consoleError(`Terjasi duplikasi data`, checkData)
        throw new ErrorResponse(422, `Data yang anda inputkan sudah terdaftar`)
    }

}




/**
 * Fungsi kanggo nambihan data satuan kerja nu enggal
 * @param {nama, lembaga, fakultas, biro, satuan} data 
 * @returns 
 */

const createNewSatker = async (data) => {
    // nangtoskeun istilah
    const { nama, lembaga, fakultas, biro, satuan } = data
    const id = uuid()

    // nyimpen data anu tos di sanggakeun ku semah
    return await connection.sATUAN_KERJA.create({
        data: {
            SATKER_ID: id,
            SATKER_NAMA: nama,
            SATKER_LEMBAGA: lembaga,
            SATKER_FAKULTAS: fakultas,
            SATKER_BIRO: biro,
            SATKER_SATUAN: satuan
        }
    })
}




/**
 * Fungsi kanggo marios bilih aya data anu duplikat
 * @param value 
 * @returns 
 */

const checkDuplicated = async (value) => {
    // nangtoskeun istilah
    let response

    // milari data satuan kerja
    const result = await connection.sATUAN_KERJA.findFirst({
        where: {
            OR: [
                { SATKER_LEMBAGA: value },
                { SATKER_FAKULTAS: value },
                { SATKER_BIRO: value },
                { SATKER_SATUAN: value }
            ]
        },

        select: { SATKER_ID: true, SATKER_NAMA: true }
    })

    // nangtoskeun hasil kanggo semah
    if (null == result) { response = true } else { response = result }

    // ngadugikeun hasil ka semah
    return response
}




/**
 * Fungsi kanggo ngarobih data satuan kerja
 * @param id 
 * @param {nama, lembaga, fakultas, biro, satuan} params 
 * @returns 
 */

const updateSatker = async (id, params) => {
    // nangtoskeun istilah
    const { nama, lembaga, fakultas, biro, satuan } = params
    let data = {}

    if (null != lembaga) {
        data = { SATKER_NAMA: nama, SATKER_LEMBAGA: lembaga }
    }

    if (null != fakultas) {
        data = { SATKER_NAMA: nama, SATKER_FAKULTAS: fakultas }
    }

    if (null != biro) {
        data = { SATKER_NAMA: nama, SATKER_BIRO: biro }
    }

    if (null != satuan) {
        data = { SATKER_NAMA: nama, SATKER_SATUAN: satuan }
    }


    // Ngarobih data satuan kerja dumasar kana id
    return await connection.sATUAN_KERJA.update({
        data,
        where: { SATKER_ID: id },
    })
}




/**
 * Fungsi kanggo mupus data satuan kerja
 * @param id 
 * @returns 
 */

const deleteSatker = async (id) => {
    // mupus data satuan kerja dumasar kana id
    return await connection.sATUAN_KERJA.delete({
        where: { SATKER_ID: id }
    })
}




// ------------------------- *** The best preparation for tomorrow is doing your best today. *** -------------------------//




/**
 * Pangladen pikeun maca data satuan kerja dumasar kana status anu ditangtoskeun
 * @param {status} data 
 * @returns 
 */

export const serviceGetAllSatKer = async (data) => {
    // nangtoskeun istilah
    const { status } = data

    // ngajalankeun parintah maca data dumasar kana status
    const result = await getallSatKer(status)

    // Ngadamel seratan kanggo console dumasar kana hasil getAllSatKer
    if (false == result.length) {
        consoleInfo(`Tidak ada data satker untuk ditampilkan`, result)
    } else {
        consoleInfo(`Data satker berhasil ditemukan`, result[0])
    }

    // Ngadugikeun hasil ka controller
    return result
}




/**
 * Pangladen pikeun milarian data satuan kerja dumasar kana id
 * @param id 
 * @returns 
 */

export const serviceGetSatkerById = async (id) => {

    // Ngajalankeun pangladen get data satker by id
    const result = await getSatkerById(id)

    // ngadamel seratan kanggo console dumasar kana hasil proses
    if (null == result) {
        consoleWarn(`Data satuan kerja dengan id ${id} tidak ditemukan`)
        throw new ErrorResponse(204)
    } else {
        consoleInfo(`Data satuan kerja berhasil ditemukan`, result)
    }

    // mulangkeun hasil kanggo semah
    return result
}




/**
 * Pangladen pikeun nambihan data satuan kerja
 * @param {nama, lembaga, fakultas, biro, satuan} data 
 * @returns 
 */

export const serviceCreateNewSatker = async (data) => {
    // marios data anu di sanggakeun ku semah
    await validate(addNewSatkerValidation, data)

    // marios data duplikat sareng data mandatory
    await checkDataMandatory(data)

    // ngalakonan pangladen kanggo nambihan data
    const result = await createNewSatker(data)
}




/**
 * Pangladen pikeun ngarobih data satuan kerja
 * @param id 
 * @param {nama, lembaga, fakultas, biro, satuan} data 
 */

export const serviceUpdateSatker = async (id, data) => {
    // marios data nu dimaksad ku semah
    const checkSatker = await getSatkerById(id)

    // marios data anu di sanggakeun ku semah
    await validate(addNewSatkerValidation, data)

    // marios data duplikat sareng data mandatory
    await checkDataMandatory(data)

    // ngalakonan proses robih data satuan kerja
    const result = await updateSatker(id, data)
}




/**
 * Pangladen pikeun mupus data satuan kerja dumasar kana id
 * @param id 
 * @returns 
 */

export const serviceDeleteSatker = async (id) => {
    // marios data satuan kerja nu di maksad ku semah
    await getSatkerById(id)

    // ngalakonan proses mupus data satuan kerja
    return await deleteSatker(id)
}