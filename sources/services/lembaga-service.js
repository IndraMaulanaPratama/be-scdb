import { connection } from "../core/connection.js";
import { ErrorResponse, consoleError, consoleInfo, consoleWarn } from "../utils/index.js";
import { v4 as uuid } from "uuid";
import { addNewLembagaValidation, validate } from "../validations/index.js"
import { validateStatus } from "./index.js";




/**
 * Fungsi pikeun milarian data lembaga dumasar kana id
 * @param id 
 * @returns 
 */

export const getLembagaById = async (id, status = `aktif`) => {
    // marios status anu di sanggakeun ku semah
    const resultStatus = validateStatus(status)

    // milarian data lembaga dumasar kana id
    const result = await connection.lEMBAGA.findFirst({
        select: { LEMBAGA_ID: true, LEMBAGA_NAMA: true, LEMBAGA_IS_DELETED: true },
        where: {
            AND: [
                { LEMBAGA_ID: id },
                { LEMBAGA_IS_DELETED: resultStatus }
            ]
        }
    })

    // mulangkeun hasil pogog ka semah
    if (null == result) {
        consoleError(`Data lembaga dengan id ${id} tidak ditemukan`, result)
        throw new ErrorResponse(400, `Data Lembaga tidak ditemukan`)
    }

    // nyanggakeun data lembaga nu kapendak
    return result
}




/**
 * Fungsi pikeun milari data lembaga dumasar kana nama
 * @param name 
 * @param status 
 * @returns 
 */

const getLembagaByName = async (nama, status = `aktif`) => {
    // marios status anu di sanggakeun ku semah
    const resultStatus = validateStatus(status)

    // milarian data lembaga dumasar kana nama
    const result = await connection.lEMBAGA.findFirst({
        select: { LEMBAGA_ID: true, LEMBAGA_NAMA: true, LEMBAGA_IS_DELETED: true },
        where: {
            AND: [
                { LEMBAGA_NAMA: nama },
                { LEMBAGA_IS_DELETED: resultStatus }
            ]
        }
    })

    // nyanggakeun data lembaga nu kapendak
    return result
}





/**
 * Fungsi pikeun maca sadaya data dumasar kana status
 * @param status 
 * @returns 
 */

const getAllLembaga = async (status) => {
    // marios status anu di sanggakeun ku semah
    const resultStatus = validateStatus(status)

    // maca data lembaga dumasar kana status
    return await connection.lEMBAGA.findMany({
        select: { LEMBAGA_ID: true, LEMBAGA_NAMA: true, LEMBAGA_IS_DELETED: true },
        where: { LEMBAGA_IS_DELETED: resultStatus }
    })
}




/**
 * Fungsi pikeun nambihan data
 * @param {nama} data 
 * @returns 
 */

const addNewLembaga = async (data) => {
    // nangtoskeun istilah
    const { nama } = data
    const kode = uuid()

    // pangladen kanggo nyimpen data enggal
    return await connection.lEMBAGA.create({
        data: {
            LEMBAGA_ID: kode,
            LEMBAGA_NAMA: nama
        }
    })
}




/**
 * Fungsi pikeun ngarobih data lembaga dumasar kana id
 * @param id 
 * @param {nama} data 
 * @param {'update', 'delete', 'restore'} status 
 * @returns 
 */

const updateLembaga = async (id, data = null, status = 'update') => {
    // nangtoskeun istilah 
    const { nama } = data
    let option = {}

    // Kondisi saupami status sami sareng update
    if ('update' == status) {
        // ngarobih data nama lembaga
        option = { LEMBAGA_NAMA: nama }
    }

    // kondisi saupami status sami sareng delete
    else if ('delete' == status) {
        // ngarobih data status janten non-aktif
        option = { LEMBAGA_IS_DELETED: true }
    }

    // kondisi saupami status sami sareng restore
    else if ('restore' == status) {
        // ngarobih status janten aktif
        option = { LEMBAGA_IS_DELETED: false }
    }

    // kondisi saupami status teu saluyu sareng katangtosan
    else {
        // mulangkeun hasil pogog ka semah
        consoleWarn(`Request status ${status} tidak valid saat update lembaga`)
        throw new ErrorResponse(400, `Invalid data validation`)
    }

    // pangladen pikeun ngarobih data lembaga
    return await connection.lEMBAGA.update({
        data: option,
        where: { LEMBAGA_ID: id },
        select: { LEMBAGA_ID: true, LEMBAGA_NAMA: true, LEMBAGA_IS_DELETED: true }
    })
}




/**
 * Fungsi pikeun mupus data lembaga dumasar kana id
 * @param id 
 * @returns 
 */

const deleteLembaga = async (id) => {
    // Milarian data lembaga dumasar kana id
    const dataLembaga = await connection.lEMBAGA.findFirst({
        select: { LEMBAGA_ID: true, LEMBAGA_NAMA: true, LEMBAGA_IS_DELETED: true },
        where: { LEMBAGA_ID: id }
    })

    // upami data lembaga teu kapendak 
    if (null == dataLembaga) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Data lembaga dengan id ${id} tidak ditemukan`, dataLembaga)
        throw new ErrorResponse(400, `Data Lembaga tidak ditemukan`)
    }

    // nangtoskeun istilah
    const status = dataLembaga.LEMBAGA_IS_DELETED
    const data = { LEMBAGA_NAMA: dataLembaga.LEMBAGA_NAMA }

    // upami status data dina ka ayaan aktif
    if (true == status) {
        // mupus data lembaga salamina
        return await connection.lEMBAGA.delete({
            where: { LEMBAGA_ID: id }
        })
    }

    // upami status data dina ka ayaan aktif
    else {
        // ngarobih status data lembaga janten non-aktif
        return await updateLembaga(id, data, 'delete')
    }

}




// ---------------------------------- *** If you fell down yesterday, stand up today. *** ----------------------------------//





/**
 * Pangladen pikeun maca sadaya data lembaga dumasar kana status
 * @param status 
 * @returns 
 */

export const serviceGetLembaga = async (status) => {
    // ngalakonan pangladen get all lembaga
    return await getAllLembaga(status)
}




/**
 * Pangladen pikeun milari data lembaga dumasar kana id
 * @param {status, id} data 
 * @returns 
 */

export const serviceGetLembagaById = async (data) => {
    // nangtoskeun istilah
    const { status, id } = data

    // ngalakonan pangladen get lembaga by id
    return await getLembagaById(id, status)
}




/**
 * Pangladen pikeun nambihan data lembaga
 * @param {nama} data 
 * @returns 
 */

export const serviceAddNewLembaga = async (data) => {

    // marios data anu disanggakeun ku semah
    await validate(addNewLembagaValidation, data)

    // nangtoskeun istilah
    const { nama } = data

    // marios bilih lembaga tos ka daftar
    const checkDuplicate = await getLembagaByName(nama)

    // mulangkeun hasil pogog kumargi data nama parantos kadaptar
    if (null != checkDuplicate) {
        consoleError(`Nama lembaga sudah terdaftar`, checkDuplicate)
        throw new ErrorResponse(422, `Nama lembaga sudah terdaftar`)
    }

    // ngalakonan proses add new lembaga
    return await addNewLembaga(data)
}




/**
 * Pangladen pikeun ngarobih data lembaga
 * @param id 
 * @param {nama} data 
 * @returns 
 */

export const serviceUpdateLembaga = async (id, data) => {
    // milari data lembaga dumasar ka id
    const dataLembaga = await getLembagaById(id)

    // marios data anu disanggakeun ku semah
    await validate(addNewLembagaValidation, data)

    // nangtoskeun istilah
    const { nama } = data

    // marios bilih lembaga tos ka daftar
    const checkDuplicate = await getLembagaByName(nama)

    // mulangkeun hasil pogog kumargi data nama parantos kadaptar
    if (null != checkDuplicate) {
        consoleError(`Nama lembaga sudah terdaftar`, checkDuplicate)
        throw new ErrorResponse(422, `Nama lembaga sudah terdaftar`)
    }

    // ngalakonan proses ngarobih data lembaga
    return await updateLembaga(id, data, `update`)
}




/**
 * Pangladen pikeun mupus data lembaga
 * @param id 
 * @returns 
 */

export const serviceDeleteLembaga = async (id) => {

    // ngalakonan pangladen delete data lembaga
    return await deleteLembaga(id)
}




/**
 * Pangladen pikeun mulihkeun data lembaga
 * @param id 
 * @returns 
 */

export const serviceRestoreLembaga = async (id) => {
    // milari data lembaga dumasar ka id
    const dataLembaga = await getLembagaById(id, 'non-aktif')

    // nangtoskeun istilah
    const data = { nama: dataLembaga.LEMBAGA_NAMA }

    // ngalakonan proses mulihkeun data lembaga
    return await updateLembaga(id, data, `restore`)

}