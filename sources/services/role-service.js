import { connection } from "../core/connection.js";
import { v4 as uuid } from "uuid";
import { consoleError, consoleInfo, consoleWarn } from "../utils/custom-logger/logger-util.js";
import { addNewValidation, updateValidation } from "../validations/role-validation.js";
import { ErrorResponse } from "../utils/error-response/error-response-util.js";
import { validate } from "../validations/validation.js";


/**
 * Melakukan pencarian data role yang memiliki status tidak aktif/data sampah
 * @param nama 
 * @returns 
 */

const trashData = async (nama) => {
    return await connection.pERAN.findMany({
        where: {
            AND: [
                { PERAN_NAMA: nama },
                { PERAN_IS_DELETED: true },
            ]
        },
        select: { PERAN_NAMA: true, PERAN_IS_DELETED: true, PERAN_CREATED_AT: true }
    })
}



/**
 * Mencari data role berdasarkan id baik itu aktif maupun nonaktif
 * @param id 
 * @returns 
 */

const searchGlobalId = async (id) => {
    return await connection.pERAN.findFirst({
        where: { PERAN_ID: id },
        select: { PERAN_NAMA: true, PERAN_IS_DELETED: true }
    })
}



/**
 * Melakukan pencarian data role berdasarkan nama role
 * @param  nama 
 * @returns
 */

const searchnama = async (nama) => {
    return await connection.pERAN.findMany({
        where: { PERAN_NAMA: nama },
        select: { PERAN_NAMA: true, PERAN_CREATED_AT: true }
    })
}



/**
 * Melakukan pencarian data role berdasarkan id role
 * @param id 
 * @returns 
 */

export const searchPeranId = async (id) => {
    // Proses pencarian database
    const result = await connection.pERAN.findFirst({
        where: {
            AND: [
                { PERAN_ID: id },
                { PERAN_IS_DELETED: false }
            ]
        },
        select: { PERAN_NAMA: true, PERAN_CREATED_AT: true }
    })

    // Kembalikan pesan error jika data tidak ditemukan
    if (null == result) {
        consoleWarn(`Data role tidak ditemukan`)
        throw new ErrorResponse(404, `Data Role tidak ditemukan`)
    }

    // Kembalikan data yang ditemukan
    return result
}



/**
 * Mencari data role berdasarkan id dan berstatus tidak aktif
 * @param id 
 * @returns 
 */

const searchTrashId = async (id) => {
    // Proses pencarian database
    const result = await connection.pERAN.findFirst({
        where: {
            AND: [
                { PERAN_ID: id },
                { PERAN_IS_DELETED: true }
            ]
        },
        select: { PERAN_NAMA: true, PERAN_CREATED_AT: true }
    })

    // Kembalikan pesan error jika data tidak ditemukan
    if (null == result) {
        consoleWarn(`Data trash role tidak ditemukan`)
        throw new ErrorResponse(404, `Data Role tidak ditemukan`)
    }

    // Kembalikan data yang ditemukan
    return result
}



/**
 * Pengecekan status aktif atau non-aktif berdasarkan id peran
 * @param  id 
 * @returns : true and false 
 */

const checkTrashId = async (id) => {
    // Proses pencarian database
    const result = await connection.pERAN.findFirst({
        where: {
            AND: [
                { PERAN_ID: id },
                { PERAN_IS_DELETED: true }
            ]
        },
        select: { PERAN_NAMA: true, PERAN_CREATED_AT: true }
    })

    // Kembalikan pesan error jika data tidak ditemukan
    if (null == result) {
        consoleWarn(`Data trash role tidak ditemukan`)
        return false
    }

    // Kembalikan data yang ditemukan
    return true
}



/**
 * Function untuk check duplikat data role dari semua status (aktif dan sampah)
 * @param {nama} req 
 */

const checkDuplicate = async (req) => {
    const { nama } = req
    let status, message, data

    // Cek apakah data role tersimpan di trash data
    const trash = await trashData(nama)

    // Cek duplikasi nama role
    const search = await searchnama(nama)

    // Mengembalikan pesan error duplikat role nama
    if (false != trash.length) {
        status = 422
        message = `Data role sudah tersimpan dalam keadaan tidak aktif`

        consoleError(message, trash)
        throw new ErrorResponse(status, message)
    }


    if (false != search.length) {
        status = 422
        message = `Terjadi duplikasi data 'nama' role pada saat prosess add new role`

        consoleError(message, search)
        throw new ErrorResponse(status, message)
    }
}



/**
 * Menambahkan data role baru
 * @param {id, nama} req
 * @returns 
 */

const createRole = async (req) => {
    // Inisialisasi Variable
    const { id, nama } = req

    // Proses menyimpan kedalam database
    return await connection.pERAN.create({
        data: { PERAN_ID: id, PERAN_NAMA: nama },
        select: { PERAN_NAMA: true }
    })
}



/**
 * Mengubah data role
 * @param {id, nama} req 
 * @returns 
 */

const updateRole = async (id, data) => {

    // Proses update data
    return await connection.pERAN.update({
        where: { PERAN_ID: id },

        data: data,

        select: { PERAN_ID: true, PERAN_NAMA: true, PERAN_IS_DELETED: true }
    })
}



/**
 * Menghapus data role
 * @param id 
 * @returns 
 */

const deleteRole = async (id) => {
    return await connection.pERAN.delete({
        where: { PERAN_ID: id }
    })
}



// ---------------------------------- *** Jangan Lupa Bahagia *** ---------------------------------- //

/**
 * Service yang di buat untuk memenuhi kebutuhan get all data role
 * @returns 
 */

export const getAllService = async () => {
    try {
        return await connection.pERAN.findMany({
            where: { PERAN_IS_DELETED: false },
            select: { PERAN_NAMA: true }
        })
    } catch (error) {
        consoleError(`Gagal mengambil semua data role`, error.message)
        throw new ErrorResponse(500, error.message)
    }
}



/**
 * Service yang dibuat untuk membuat data role baru
 * @param {nama} req 
 * @returns 
 */

export const addNewService = async (req) => {

    // Melakukan validasi data mandatory
    validate(addNewValidation, req)

    // Inisialisasi data variable
    const { nama } = req
    const id = uuid()
    let data

    // Check Duplikat Data Role
    await checkDuplicate(req)

    // Proses menambahkan data role baru
    data = { id, nama }
    return createRole(data)

}



/**
 * Service untuk mencari data role berdasarkan id
 * @param id 
 * @returns 
 */

export const getRoleService = async (id) => {

    // Proses mencari data role
    return await searchPeranId(id)
}




/**
 * Service untuk mengubah data role berdasarkan id
 * @param {id, nama} req 
 * @returns 
 */

export const updateRoleService = async (req) => {
    // Validasi data mandatory
    validate(updateValidation, req)

    // inisialisasi Variable
    const { id, nama } = req
    let data

    // Mencari data role yang tidak aktif
    const trash = await checkTrashId(id)

    if (true == trash) {
        consoleError(`Terdeteksi percobaan merubah data role dengan status tidak aktif`, { id })
        throw new ErrorResponse(400, `Data role yang anda ubah dalam keadaan tidak aktif`)
    }

    // Mencari data role yang aktif
    await searchPeranId(id)

    // Cek duplikat data role
    await checkDuplicate(req)

    // Inisialisasi variable data
    data = { PERAN_NAMA: nama }

    // Proses update data
    return await updateRole(id, data)
}



/**
 * Service untuk menghapus data role
 * @param id 
 * @returns 
 */

export const deleteRoleService = async (id) => {

    // mencari data role
    const peran = await searchGlobalId(id)

    // Kembalikan pesan error jika data peran tidak ditemukan
    if (null == peran) {
        throw new ErrorResponse(404, `Halaman tidak ditemukan`)
    }

    // Inisialisasi data peran
    const status = peran.PERAN_IS_DELETED
    consoleInfo(`Melihat status peran`, status)

    // Kondisi ketika status peran dalam keadaan tidak aktif
    if (true == status) {
        // Menjalankan proses delete peran
        return await deleteRole(id)
    }

    // Kondisi ketika status role dalam keadaan aktif
    if (false == status) {
        // Inisialisasi variable data
        const data = { PERAN_IS_DELETED: true }

        // Mengubah status role
        return await updateRole(id, data)
    }

}
