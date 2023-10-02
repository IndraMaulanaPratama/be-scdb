import { connection } from "../core/connection.js";
import { ErrorResponse, consoleError, consoleInfo, consoleWarn } from "../utils/index.js";
import { v4 as uuid } from "uuid";
import { addNewSatuanValidation, validate } from "../validations/index.js"
import { validateStatus } from "./index.js";




/**
 * Fungsi pikeun milarian data Satuan dumasar kana id
 * @param id 
 * @returns 
 */

export const getSatuanById = async (id, status = `aktif`) => {
    // marios status anu di sanggakeun ku semah
    const resultStatus = validateStatus(status)

    // milarian data Satuan dumasar kana id
    const result = await connection.sATUAN.findFirst({
        select: { SATUAN_ID: true, SATUAN_NAMA: true, SATUAN_IS_DELETED: true },
        where: {
            AND: [
                { SATUAN_ID: id },
                { SATUAN_IS_DELETED: resultStatus }
            ]
        }
    })

    // mulangkeun hasil pogog ka semah
    if (null == result) {
        consoleError(`Data Satuan dengan id ${id} tidak ditemukan`, result)
        throw new ErrorResponse(400, `Data Satuan tidak ditemukan`)
    }

    // nyanggakeun data Satuan nu kapendak
    return result
}




/**
 * Fungsi pikeun milari data Satuan dumasar kana nama
 * @param name 
 * @param status 
 * @returns 
 */

const getSatuanByName = async (nama, status = `aktif`) => {
    // marios status anu di sanggakeun ku semah
    const resultStatus = validateStatus(status)

    // milarian data Satuan dumasar kana nama
    const result = await connection.sATUAN.findFirst({
        select: { SATUAN_ID: true, SATUAN_NAMA: true, SATUAN_IS_DELETED: true },
        where: {
            AND: [
                { SATUAN_NAMA: nama },
                { SATUAN_IS_DELETED: resultStatus }
            ]
        }
    })

    // nyanggakeun data Satuan nu kapendak
    return result
}




/**
 * Fungsi pikeun maca sadaya data dumasar kana status
 * @param status 
 * @returns 
 */

const getAllSatuan = async (status) => {
    // marios status anu di sanggakeun ku semah
    const resultStatus = validateStatus(status)

    // maca data Satuan dumasar kana status
    return await connection.sATUAN.findMany({
        select: { SATUAN_ID: true, SATUAN_NAMA: true, SATUAN_IS_DELETED: true },
        where: { SATUAN_IS_DELETED: resultStatus }
    })
}




/**
 * Fungsi pikeun nambihan data
 * @param {nama} data 
 * @returns 
 */

const addNewSatuan = async (data) => {
    // nangtoskeun istilah
    const { nama } = data
    const kode = uuid()

    // pangladen kanggo nyimpen data enggal
    return await connection.sATUAN.create({
        data: {
            SATUAN_ID: kode,
            SATUAN_NAMA: nama
        }
    })
}




/**
 * Fungsi pikeun ngarobih data Satuan dumasar kana id
 * @param id 
 * @param {nama} data 
 * @param {'update', 'delete', 'restore'} status 
 * @returns 
 */

const updateSatuan = async (id, data = null, status = 'update') => {
    // nangtoskeun istilah 
    const { nama } = data
    let option = {}

    // Kondisi saupami status sami sareng update
    if ('update' == status) {
        // ngarobih data nama Satuan
        option = { SATUAN_NAMA: nama }
    }

    // kondisi saupami status sami sareng delete
    else if ('delete' == status) {
        // ngarobih data status janten non-aktif
        option = { SATUAN_IS_DELETED: true }
    }

    // kondisi saupami status sami sareng restore
    else if ('restore' == status) {
        // ngarobih status janten aktif
        option = { SATUAN_IS_DELETED: false }
    }

    // kondisi saupami status teu saluyu sareng katangtosan
    else {
        // mulangkeun hasil pogog ka semah
        consoleWarn(`Request status ${status} tidak valid saat update Satuan`)
        throw new ErrorResponse(400, `Invalid data validation`)
    }

    // pangladen pikeun ngarobih data Satuan
    return await connection.sATUAN.update({
        data: option,
        where: { SATUAN_ID: id },
        select: { SATUAN_ID: true, SATUAN_NAMA: true, SATUAN_IS_DELETED: true }
    })
}




/**
 * Fungsi pikeun mupus data Satuan dumasar kana id
 * @param id 
 * @returns 
 */

const deleteSatuan = async (id) => {
    // Milarian data Satuan dumasar kana id
    const dataSatuan = await connection.sATUAN.findFirst({
        select: { SATUAN_ID: true, SATUAN_NAMA: true, SATUAN_IS_DELETED: true },
        where: { SATUAN_ID: id }
    })

    // upami data Satuan teu kapendak 
    if (null == dataSatuan) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Data Satuan dengan id ${id} tidak ditemukan`, dataSatuan)
        throw new ErrorResponse(400, `Data Satuan tidak ditemukan`)
    }

    // nangtoskeun istilah
    const status = dataSatuan.SATUAN_IS_DELETED
    const data = { SATUAN_NAMA: dataSatuan.SATUAN_NAMA }

    // upami status data dina ka ayaan aktif
    if (true == status) {
        // mupus data Satuan salamina
        return await connection.sATUAN.delete({
            where: { SATUAN_ID: id }
        })
    }

    // upami status data dina ka ayaan aktif
    else {
        // ngarobih status data Satuan janten non-aktif
        return await updateSatuan(id, data, 'delete')
    }

}




// ---------------------------------------- *** One day or day one. You decide. *** ----------------------------------------//




/**
 * Pangladen pikeun maca sadaya data Satuan dumasar kana status
 * @param status 
 * @returns 
 */

export const serviceGetSatuan = async (status) => {
    // ngalakonan pangladen get all Satuan
    return await getAllSatuan(status)
}




/**
 * Pangladen pikeun milari data Satuan dumasar kana id
 * @param {status, id} data 
 * @returns 
 */

export const serviceGetSatuanById = async (data) => {
    // nangtoskeun istilah
    const { status, id } = data

    // ngalakonan pangladen get Satuan by id
    return await getSatuanById(id, status)
}




/**
 * Pangladen pikeun nambihan data Satuan
 * @param {nama} data 
 * @returns 
 */

export const serviceAddNewSatuan = async (data) => {

    // marios data anu disanggakeun ku semah
    await validate(addNewSatuanValidation, data)

    // nangtoskeun istilah
    const { nama } = data

    // marios bilih Satuan tos ka daftar
    const checkDuplicate = await getSatuanByName(nama)

    // mulangkeun hasil pogog kumargi data nama parantos kadaptar
    if (null != checkDuplicate) {
        consoleError(`Nama Satuan sudah terdaftar`, checkDuplicate)
        throw new ErrorResponse(422, `Nama Satuan sudah terdaftar`)
    }

    // ngalakonan proses add new Satuan
    return await addNewSatuan(data)
}




/**
 * Pangladen pikeun ngarobih data Satuan
 * @param id 
 * @param {nama} data 
 * @returns 
 */

export const serviceUpdateSatuan = async (id, data) => {
    // milari data Satuan dumasar ka id
    const dataSatuan = await getSatuanById(id)

    // marios data anu disanggakeun ku semah
    await validate(addNewSatuanValidation, data)

    // nangtoskeun istilah
    const { nama } = data

    // marios bilih Satuan tos ka daftar
    const checkDuplicate = await getSatuanByName(nama)

    // mulangkeun hasil pogog kumargi data nama parantos kadaptar
    if (null != checkDuplicate) {
        consoleError(`Nama Satuan sudah terdaftar`, checkDuplicate)
        throw new ErrorResponse(422, `Nama Satuan sudah terdaftar`)
    }

    // ngalakonan proses ngarobih data Satuan
    return await updateSatuan(id, data, `update`)
}




/**
 * Pangladen pikeun mupus data Satuan
 * @param id 
 * @returns 
 */

export const serviceDeleteSatuan = async (id) => {

    // ngalakonan pangladen delete data Satuan
    return await deleteSatuan(id)
}




/**
 * Pangladen pikeun mulihkeun data Satuan
 * @param id 
 * @returns 
 */

export const serviceRestoreSatuan = async (id) => {
    // milari data Satuan dumasar ka id
    const dataSatuan = await getSatuanById(id, 'non-aktif')

    // nangtoskeun istilah
    const data = { nama: dataSatuan.Satuan_NAMA }

    // ngalakonan proses mulihkeun data Satuan
    return await updateSatuan(id, data, `restore`)

}