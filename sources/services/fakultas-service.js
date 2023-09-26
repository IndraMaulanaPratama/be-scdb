import { connection } from "../core/connection.js";
import { ErrorResponse, consoleError, consoleInfo } from "../utils/index.js";
import { v4 as uuid } from "uuid";
import { addNewFakultasValidation } from "../validations/index.js"
import { validateStatus } from "./index.js";




/**
 * Fungsi pikeun milarian data fakultas dumasar kana id
 * @param id 
 * @returns 
 */

export const getFakultasById = async (id, status = 'aktif') => {
    // marios status anu di sanggakeun ku semah
    const resultStatus = validateStatus(status)

    // milarian data fakultas dumasar kana id
    const result = await connection.fAKULTAS.findFirst({
        select: { FAKULTAS_ID: true, FAKULTAS_NAMA: true, FAKULTAS_IS_DELETED: true },
        where: {
            AND: [
                { FAKULTAS_ID: id },
                { FAKULTAS_IS_DELETED: resultStatus }
            ]
        }
    })

    // mulangkeun hasil pogog ka semah
    if (null == result) {
        consoleError(`Data Fakultas dengan id ${id} tidak ditemukan`, result)
        throw new ErrorResponse(400, `Data Fakultas tidak ditemukan`)
    }

    // nyanggakeun data Fakultas nu kapendak
    return result
}




/**
 * Fungsi pikeun milari data fakultas dumasar kana nama
 * @param name 
 * @param status 
 * @returns 
 */

const getFakultasByName = async (nama, status = `aktif`) => {
    // marios status anu di sanggakeun ku semah
    const resultStatus = validateStatus(status)

    // milarian data fakultas dumasar kana nama
    const result = await connection.fAKULTAS.findFirst({
        select: { FAKULTAS_ID: true, FAKULTAS_NAMA: true, FAKULTAS_IS_DELETED: true },
        where: {
            AND: [
                { FAKULTAS_NAMA: nama },
                { FAKULTAS_IS_DELETED: resultStatus }
            ]
        }
    })

    // nyanggakeun data fakultas nu kapendak
    return result
}




/**
 * Fungsi pikeun maca sadaya data dumasar kana status
 * @param status 
 * @returns 
 */

const getAllFakultas = async (status) => {
    // marios status anu di sanggakeun ku semah
    const resultStatus = validateStatus(status)

    // maca data fakultas dumasar kana status
    return await connection.fAKULTAS.findMany({
        select: { FAKULTAS_ID: true, FAKULTAS_NAMA: true, FAKULTAS_IS_DELETED: true },
        where: { FAKULTAS_IS_DELETED: resultStatus }
    })
}




/**
 * Fungsi pikeun nambihan data
 * @param {nama} data 
 * @returns 
 */

const addNewFakultas = async (data) => {
    // nangtoskeun istilah
    const { nama } = data
    const kode = uuid()

    // pangladen kanggo nyimpen data enggal
    return await connection.fAKULTAS.create({
        data: {
            FAKULTAS_ID: kode,
            FAKULTAS_NAMA: nama
        }
    })
}




/**
 * Fungsi pikeun ngarobih data fakultas dumasar kana id
 * @param id 
 * @param {nama} data 
 * @param {'update', 'delete', 'restore'} status 
 * @returns 
 */

const updateFakultas = async (id, data = null, status = 'update') => {
    // nangtoskeun istilah 
    const { nama } = data
    let option = {}

    // Kondisi saupami status sami sareng update
    if ('update' == status) {
        // ngarobih data nama fakultas
        option = { FAKULTAS_NAMA: nama }
    }

    // kondisi saupami status sami sareng delete
    else if ('delete' == status) {
        // ngarobih data status janten non-aktif
        option = { FAKULTAS_IS_DELETED: true }
    }

    // kondisi saupami status sami sareng restore
    else if ('restore' == status) {
        // ngarobih status janten aktif
        option = { FAKULTAS_IS_DELETED: false }
    }

    // kondisi saupami status teu saluyu sareng katangtosan
    else {
        // mulangkeun hasil pogog ka semah
        consoleWarn(`Request status ${status} tidak valid saat update fakultas`)
        throw new ErrorResponse(400, `Invalid data validation`)
    }

    // pangladen pikeun ngarobih data fakultas
    return await connection.fAKULTAS.update({
        data: option,
        where: { FAKULTAS_ID: id },
        select: { FAKULTAS_ID: true, FAKULTAS_NAMA: true, FAKULTAS_IS_DELETED: true }
    })
}




/**
 * Fungsi pikeun mupus data fakultas dumasar kana id
 * @param id 
 * @returns 
 */

const deleteFakultas = async (id) => {
    // Milarian data fakultas dumasar kana id
    const dataFakultas = await connection.fAKULTAS.findFirst({
        select: { FAKULTAS_ID: true, FAKULTAS_NAMA: true, FAKULTAS_IS_DELETED: true },
        where: { FAKULTAS_ID: id }
    })

    // upami data fakultas teu kapendak 
    if (null == dataFakultas) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Data fakultas dengan id ${id} tidak ditemukan`, dataFakultas)
        throw new ErrorResponse(400, `Data fakultas tidak ditemukan`)
    }

    // nangtoskeun istilah
    const status = dataFakultas.FAKULTAS_IS_DELETED
    const data = { FAKULTAS_NAMA: dataFakultas.FAKULTAS_NAMA }

    // upami status data dina ka ayaan aktif
    if (true == status) {
        // mupus data fakultas salamina
        return await connection.fAKULTAS.delete({
            where: { FAKULTAS_ID: id }
        })
    }

    // upami status data dina ka ayaan aktif
    else {
        // ngarobih status data fakultas janten non-aktif
        return await updateFakultas(id, data, 'delete')
    }

}




// ----------------------------- *** The secret of getting ahead is getting started. *** -----------------------------//




/**
 * Pangladen pikeun maca sadaya data fakultas dumasar kana status
 * @param status 
 * @returns 
 */

export const serviceGetFakultas = async (status) => {
    // ngalakonan pangladen get all fakultas
    return await getAllFakultas(status)
}




/**
 * Pangladen pikeun milari data fakultas dumasar kana id
 * @param {status, id} data 
 * @returns 
 */

export const serviceGetFakultasById = async (data) => {
    // nangtoskeun istilah
    const { status, id } = data

    // ngalakonan pangladen get fakultas by id
    return await getFakultasById(id, status)
}




/**
 * Pangladen pikeun nambihan data fakultas
 * @param {nama} data 
 * @returns 
 */

export const serviceAddNewFakultas = async (data) => {

    // marios data anu disanggakeun ku semah
    await validate(addNewFakultasValidation, data)

    // nangtoskeun istilah
    const { nama } = data

    // marios bilih fakultas tos ka daftar
    const checkDuplicate = await getFakultasByName(nama)

    // mulangkeun hasil pogog kumargi data nama parantos kadaptar
    if (null != checkDuplicate) {
        consoleError(`Nama fakultas sudah terdaftar`, checkDuplicate)
        throw new ErrorResponse(422, `Nama fakultas sudah terdaftar`)
    }

    // ngalakonan proses add new fakultas
    return await addNewFakultas(data)
}




/**
 * Pangladen pikeun ngarobih data fakultas
 * @param id 
 * @param {nama} data 
 * @returns 
 */

export const serviceUpdateFakultas = async (id, data) => {
    // milari data fakultas dumasar ka id
    const dataFakultas = await getFakultasById(id)

    // marios data anu disanggakeun ku semah
    await validate(addNewFakultasValidation, data)

    // nangtoskeun istilah
    const { nama } = data

    // marios bilih fakultas tos ka daftar
    const checkDuplicate = await getFakultasByName(nama)

    // mulangkeun hasil pogog kumargi data nama parantos kadaptar
    if (null != checkDuplicate) {
        consoleError(`Nama fakultas sudah terdaftar`, checkDuplicate)
        throw new ErrorResponse(422, `Nama fakultas sudah terdaftar`)
    }

    // ngalakonan proses ngarobih data fakultas
    return await updateFakultas(id, data, `update`)
}




/**
 * Pangladen pikeun mupus data fakultas
 * @param id 
 * @returns 
 */

export const serviceDeleteFakultas = async (id) => {

    // ngalakonan pangladen delete data fakultas
    return await deleteFakultas(id)
}




/**
 * Pangladen pikeun mulihkeun data fakultas
 * @param id 
 * @returns 
 */

export const serviceRestoreFakultas = async (id) => {
    // milari data fakultas dumasar ka id
    const dataFakultas = await getFakultasById(id, 'non-aktif')

    // nangtoskeun istilah
    const data = { nama: dataFakultas.FAKULTAS_NAMA }

    // ngalakonan proses mulihkeun data fakultas
    return await updateFakultas(id, data, `restore`)

}