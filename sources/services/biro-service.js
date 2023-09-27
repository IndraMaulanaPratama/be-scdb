import { connection } from "../core/connection.js";
import { ErrorResponse, consoleError, consoleInfo, consoleWarn } from "../utils/index.js";
import { v4 as uuid } from "uuid";
import { addNewBiroValidation, validate } from "../validations/index.js"
import { validateStatus } from "./index.js";




/**
 * Fungsi pikeun milarian data Biro dumasar kana id
 * @param id 
 * @returns 
 */

export const getBiroById = async (id, status = `aktif`) => {
    // marios status anu di sanggakeun ku semah
    const resultStatus = validateStatus(status)

    // milarian data Biro dumasar kana id
    const result = await connection.bIRO.findFirst({
        select: { BIRO_ID: true, BIRO_NAMA: true, BIRO_IS_DELETED: true },
        where: {
            AND: [
                { BIRO_ID: id },
                { BIRO_IS_DELETED: resultStatus }
            ]
        }
    })

    // mulangkeun hasil pogog ka semah
    if (null == result) {
        consoleError(`Data Biro dengan id ${id} tidak ditemukan`, result)
        throw new ErrorResponse(400, `Data Biro tidak ditemukan`)
    }

    // nyanggakeun data Biro nu kapendak
    return result
}




/**
 * Fungsi pikeun milari data Biro dumasar kana nama
 * @param name 
 * @param status 
 * @returns 
 */

const getBiroByName = async (nama, status = `aktif`) => {
    // marios status anu di sanggakeun ku semah
    const resultStatus = validateStatus(status)

    // milarian data Biro dumasar kana nama
    const result = await connection.bIRO.findFirst({
        select: { BIRO_ID: true, BIRO_NAMA: true, BIRO_IS_DELETED: true },
        where: {
            AND: [
                { BIRO_NAMA: nama },
                { BIRO_IS_DELETED: resultStatus }
            ]
        }
    })

    // nyanggakeun data Biro nu kapendak
    return result
}




/**
 * Fungsi pikeun maca sadaya data dumasar kana status
 * @param status 
 * @returns 
 */

const getAllBiro = async (status) => {
    // marios status anu di sanggakeun ku semah
    const resultStatus = validateStatus(status)

    // maca data Biro dumasar kana status
    return await connection.bIRO.findMany({
        select: { BIRO_ID: true, BIRO_NAMA: true, BIRO_IS_DELETED: true },
        where: { BIRO_IS_DELETED: resultStatus }
    })
}




/**
 * Fungsi pikeun nambihan data
 * @param {nama} data 
 * @returns 
 */

const addNewBiro = async (data) => {
    // nangtoskeun istilah
    const { nama } = data
    const kode = uuid()

    // pangladen kanggo nyimpen data enggal
    return await connection.bIRO.create({
        data: {
            BIRO_ID: kode,
            BIRO_NAMA: nama
        }
    })
}




/**
 * Fungsi pikeun ngarobih data Biro dumasar kana id
 * @param id 
 * @param {nama} data 
 * @param {'update', 'delete', 'restore'} status 
 * @returns 
 */

const updateBiro = async (id, data = null, status = 'update') => {
    // nangtoskeun istilah 
    const { nama } = data
    let option = {}

    // Kondisi saupami status sami sareng update
    if ('update' == status) {
        // ngarobih data nama Biro
        option = { BIRO_NAMA: nama }
    }

    // kondisi saupami status sami sareng delete
    else if ('delete' == status) {
        // ngarobih data status janten non-aktif
        option = { BIRO_IS_DELETED: true }
    }

    // kondisi saupami status sami sareng restore
    else if ('restore' == status) {
        // ngarobih status janten aktif
        option = { BIRO_IS_DELETED: false }
    }

    // kondisi saupami status teu saluyu sareng katangtosan
    else {
        // mulangkeun hasil pogog ka semah
        consoleWarn(`Request status ${status} tidak valid saat update Biro`)
        throw new ErrorResponse(400, `Invalid data validation`)
    }

    // pangladen pikeun ngarobih data Biro
    return await connection.bIRO.update({
        data: option,
        where: { BIRO_ID: id },
        select: { BIRO_ID: true, BIRO_NAMA: true, BIRO_IS_DELETED: true }
    })
}




/**
 * Fungsi pikeun mupus data Biro dumasar kana id
 * @param id 
 * @returns 
 */

const deleteBiro = async (id) => {
    // Milarian data Biro dumasar kana id
    const dataBiro = await connection.bIRO.findFirst({
        select: { BIRO_ID: true, BIRO_NAMA: true, BIRO_IS_DELETED: true },
        where: { BIRO_ID: id }
    })

    // upami data Biro teu kapendak 
    if (null == dataBiro) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Data Biro dengan id ${id} tidak ditemukan`, dataBiro)
        throw new ErrorResponse(400, `Data Biro tidak ditemukan`)
    }

    // nangtoskeun istilah
    const status = dataBiro.BIRO_IS_DELETED
    const data = { BIRO_NAMA: dataBiro.BIRO_NAMA }

    // upami status data dina ka ayaan aktif
    if (true == status) {
        // mupus data Biro salamina
        return await connection.bIRO.delete({
            where: { BIRO_ID: id }
        })
    }

    // upami status data dina ka ayaan aktif
    else {
        // ngarobih status data Biro janten non-aktif
        return await updateBiro(id, data, 'delete')
    }

}




// ---------------------------------------- *** One day or day one. You decide. *** ----------------------------------------//




/**
 * Pangladen pikeun maca sadaya data Biro dumasar kana status
 * @param status 
 * @returns 
 */

export const serviceGetBiro = async (status) => {
    // ngalakonan pangladen get all Biro
    return await getAllBiro(status)
}




/**
 * Pangladen pikeun milari data Biro dumasar kana id
 * @param {status, id} data 
 * @returns 
 */

export const serviceGetBiroById = async (data) => {
    // nangtoskeun istilah
    const { status, id } = data

    // ngalakonan pangladen get Biro by id
    return await getBiroById(id, status)
}




/**
 * Pangladen pikeun nambihan data Biro
 * @param {nama} data 
 * @returns 
 */

export const serviceAddNewBiro = async (data) => {

    // marios data anu disanggakeun ku semah
    await validate(addNewBiroValidation, data)

    // nangtoskeun istilah
    const { nama } = data

    // marios bilih Biro tos ka daftar
    const checkDuplicate = await getBiroByName(nama)

    // mulangkeun hasil pogog kumargi data nama parantos kadaptar
    if (null != checkDuplicate) {
        consoleError(`Nama Biro sudah terdaftar`, checkDuplicate)
        throw new ErrorResponse(422, `Nama Biro sudah terdaftar`)
    }

    // ngalakonan proses add new Biro
    return await addNewBiro(data)
}




/**
 * Pangladen pikeun ngarobih data Biro
 * @param id 
 * @param {nama} data 
 * @returns 
 */

export const serviceUpdateBiro = async (id, data) => {
    // milari data Biro dumasar ka id
    const dataBiro = await getBiroById(id)

    // marios data anu disanggakeun ku semah
    await validate(addNewBiroValidation, data)

    // nangtoskeun istilah
    const { nama } = data

    // marios bilih Biro tos ka daftar
    const checkDuplicate = await getBiroByName(nama)

    // mulangkeun hasil pogog kumargi data nama parantos kadaptar
    if (null != checkDuplicate) {
        consoleError(`Nama Biro sudah terdaftar`, checkDuplicate)
        throw new ErrorResponse(422, `Nama Biro sudah terdaftar`)
    }

    // ngalakonan proses ngarobih data Biro
    return await updateBiro(id, data, `update`)
}




/**
 * Pangladen pikeun mupus data Biro
 * @param id 
 * @returns 
 */

export const serviceDeleteBiro = async (id) => {

    // ngalakonan pangladen delete data Biro
    return await deleteBiro(id)
}




/**
 * Pangladen pikeun mulihkeun data Biro
 * @param id 
 * @returns 
 */

export const serviceRestoreBiro = async (id) => {
    // milari data Biro dumasar ka id
    const dataBiro = await getBiroById(id, 'non-aktif')

    // nangtoskeun istilah
    const data = { nama: dataBiro.BIRO_NAMA }

    // ngalakonan proses mulihkeun data Biro
    return await updateBiro(id, data, `restore`)

}