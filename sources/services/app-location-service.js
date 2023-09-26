import dotenv from "dotenv/config";
import { v4 as uuid } from "uuid";
import { connection } from "../core/connection.js";
import { ErrorResponse, consoleError, consoleInfo, consoleWarn } from "../utils/index.js";
import { validate, validateAddAppLocation, validateUpdateAppLocation } from "../validations/index.js";


/**
 * Function untuk memvalidasi request status
 * @param {*} status 
 */

export const validateStatus = (status) => {
    // Inisialisasi variable
    let result

    // Filtrasi request status
    if (status != "aktif" && status != "non-aktif") {
        consoleError(`Request status tidak valid`, status)
        throw new ErrorResponse(400, `Request data tidak valid`)
    } else {
        ("aktif" == status) ? result = false : result = true
        return result
    }
}




/**
 * Fungsi untuk membaca semua data aplikasi sesuai dengan status yang diminta (aktif dan non-aktif)
 * @param {*} status 
 * @returns 
 */

const getAllAppLocation = async (status) => {

    // Menjalankan validasi status
    const resultStatus = validateStatus(status)

    // Mengembalikan data sesuai dengan apa yang ditemukan didalam database
    return await connection.lOKASI_APLIKASI.findMany({
        where: {
            APLIKASI: { APLIKASI_IS_DELETED: resultStatus }
        },

        select: {
            APLIKASI: {
                select: {
                    APLIKASI_ID: true,
                    APLIKASI_NAMA: true,
                    APLIKASI_URL: true,
                    APLIKASI_ADMIN: true,
                    APLIKASI_IS_DELETED: true,

                    PENGGUNA: { select: { PENGGUNA_USERNAME: true } }
                }
            },

            SATUAN_KERJA: {
                select: {
                    SATKER_ID: true,
                    SATKER_NAMA: true
                }
            },


        }
    })
}




/**
 * Fungsi untuk mengambil satu data lokasi aplikasi berdasarkan status aktifasi aplikasi dan id lokasi aplikasi
 * @param {*} status
 * @param {*} id 
 * @returns 
 */

const getAppLocationById = async (status, id) => {

    // Menjalankan validasi status
    const resultStatus = validateStatus(status)

    // Melakukan pencarian ke database
    const result = await connection.lOKASI_APLIKASI.findFirst({
        where: {
            AND: [
                { APLIKASI: { APLIKASI_IS_DELETED: resultStatus } },
                { LOKASI_ID: id }
            ]
        },

        select: {
            APLIKASI: {
                select: {
                    APLIKASI_ID: true,
                    APLIKASI_NAMA: true,
                    APLIKASI_ADMIN: true,
                    APLIKASI_URL: true,
                    APLIKASI_IS_DELETED: true,

                    PENGGUNA: { select: { PENGGUNA_USERNAME: true } }
                }
            },

            SATUAN_KERJA: {
                select: {
                    SATKER_ID: true,
                    SATKER_NAMA: true
                }
            }
        }
    })

    // Melakukan handle response ketika data tidak ditemukan
    if (null == result) {
        consoleWarn(`Data lokasi aplikasi dengan id ${id} tidak ditemukan`)
        throw new ErrorResponse(404, `Data Lokasi Aplikasi tidak ditemukan`)
    }

    // Mengembalikan data yang ditemukan
    return result
}




/**
 * Fungsi untuk mengambil satu data lokasi aplikasi berdasarkan status dan id aplikasi
 * @param {*} status
 * @param {*} id 
 * @returns 
 */

const getAppLocationByIdApp = async (status, id) => {

    // Menjalankan validasi status
    const resultStatus = validateStatus(status)

    // Melakukan pencarian kedalam database
    const result = await connection.lOKASI_APLIKASI.findFirst({
        where: {
            AND: [
                { APLIKASI: { APLIKASI_IS_DELETED: resultStatus } },
                { APLIKASI: { APLIKASI_ID: id } }
            ]
        },

        select: {
            APLIKASI: {
                select: {
                    APLIKASI_ID: true,
                    APLIKASI_NAMA: true,
                    APLIKASI_ADMIN: true,
                    APLIKASI_URL: true,
                    APLIKASI_IS_DELETED: true,

                    PENGGUNA: { select: { PENGGUNA_USERNAME: true } }
                }
            },

            SATUAN_KERJA: {
                select: {
                    SATKER_ID: true,
                    SATKER_NAMA: true
                }
            }
        }
    })

    // Membuat handle request ketika data tidak ditemukan
    if (null == result) {
        consoleWarn(`Lokasi Aplikasi dengan id aplikasi ${id} tidak ditemukan`)
        throw new ErrorResponse(404, `Lokasi Aplikasi tidak ditemukan`)
    }

    // Mengembalikan data yang dutemukan
    return result
}




/**
 * Fungsi untuk menambah data lokasi applikasi
 * @param {aplikasi, satuan_kerja} data 
 * @returns 
 */

const createAppLocation = async (data) => {
    // Inisialissi variable
    const { aplikasi, satuan_kerja } = data
    const id = uuid()

    // Menjalankan proses input data ke database
    return await connection.lOKASI_APLIKASI.create({
        data: {
            LOKASI_ID: id,
            LOKASI_APLIKASI: aplikasi,
            LOKASI_SATUAN_KERJA: satuan_kerja,
        }
    })
}



/**
 * Fungsi untuk memvalidasi data aplikasi apakah sudah terdaftar atau belum
 * @param {*} id 
 * @returns 
 */

const checkDuplicateApp = async (id) => {
    // Mencari data berdasarkan id aplikasi di dalam table lokasi applikasi
    const result = await connection.lOKASI_APLIKASI.findFirst({
        where: { LOKASI_APLIKASI: id },
        select: {
            LOKASI_ID: true,
            APLIKASI: { select: { APLIKASI_NAMA: true, APLIKASI_URL: true, APLIKASI_IS_DELETED: true } }
        },

    })

    // Mengembalikan pesan true jika data aplikasi belum terdaftar
    if (null == result) { return false }

    // Mengembalikan pesan false jika data aplikasi sudah tedaftar∂
    else { return result }
}




/**
 * Fungsi untuk merubah data lokasi aplikasi berdasarkan id
 * @param id 
 * @param {applikasi, satuan_kerja} data 
 * @returns 
 */

const updateAppLocation = async (id, data) => {
    // Inisialisasi variable
    const { applikasi, satuan_kerja, status } = data

    // Validate status value
    validateStatus(status)

    // Menjalankan proses update
    return await connection.lOKASI_APLIKASI.update({
        where: { LOKASI_ID: id },
        data: { LOKASI_APLIKASI: applikasi, LOKASI_SATUAN_KERJA: satuan_kerja },
        select: {
            LOKASI_ID: true,
            APLIKASI: { select: { APLIKASI_NAMA: true, APLIKASI_URL: true, APLIKASI_IS_DELETED: true } },
            SATUAN_KERJA: { select: { SATKER_NAMA: true } }
        }
    })
}




/**
 * Fungsi untuk menghapus data app location secara permanent
 * @param id 
 * @returns 
 */

const deleteAppLocation = async (id) => {
    return connection.lOKASI_APLIKASI.delete({
        where: { LOKASI_ID: id }
    })
}




// -------------------------------- *** If you can dream it, you can do it. *** --------------------------------//




/**
 * Service untuk menampilkan data berdasarkan status
 * @param status 
 * @returns 
 */

export const getAllAppLocationService = async (status) => {

    // Menjalaknan proses pencarian data
    const result = await getAllAppLocation(status)

    // Filtrasi response
    if (null == result.length) {
        consoleWarn(`Tidak ada data lokasi aplikasi untuk ditampilkan`)

    } else {
        consoleInfo(`Berhasil membaca semua data lokasi aplikasi dengan status ${status} `, result[0])
    }

    return result
}




/**
 * Service untuk menampilkan data berdasarkan status dan id lokasi
 * @param {*} status 
 * @param {*} id 
 * @returns 
 */

export const getAllAppLocationServiceById = async (status, id) => {
    // Menjalaknan proses pencarian data
    const result = await getAppLocationById(status, id)

    // Filtrasi response
    if (false == result) {
        consoleWarn(`Tidak ada data lokasi aplikasi untuk ditampilkan`)

    } else {
        consoleInfo(`Berhasil membaca semua data lokasi aplikasi dengan id ${id} dan status ${status} `, result[0])
    }

    return result
}




/**
 * Service untuk menampilkan data berdasarkan status dan id aplikasi
 * @param {*} status 
 * @param {*} id 
 * @returns 
 */

export const getAllAppLocationServiceByIdApp = async (status, id) => {

    // Menjalaknan proses pencarian data
    const result = await getAppLocationByIdApp(status, id)

    // Filtrasi response
    if (false == result) {
        consoleWarn(`Tidak ada data lokasi aplikasi untuk ditampilkan`)
    } else {
        consoleInfo(`Berhasil membaca semua data lokasi aplikasi dengan id ${id} dan status ${status} `, result[0])
    }

    return result
}




/**
 * Service untuk menyimpan data baru
 * @param {aplikasi, satuan_kerja} data 
 * @returns 
 */

export const createAppLocationService = async (data) => {
    // Validasi data mandatory
    await validate(validateAddAppLocation, data)

    // Inisialisasi variable
    const { aplikasi, satuan_kerja } = data

    // Validasi data aplikasi
    const searchApp = await connection.aPLIKASI.findFirst({
        where: {
            AND: [
                { APLIKASI_ID: aplikasi },
                { APLIKASI_IS_DELETED: false },
            ]
        },
        select: { APLIKASI_ID: true, APLIKASI_NAMA: true }
    }) // TODO:: Ubah menjadi function search application by id

    // Validasi data satuan kerja
    const searchSatker = await connection.sATUAN_KERJA.findFirst({
        where: { SATKER_ID: satuan_kerja },
        select: { SATKER_ID: true, SATKER_NAMA: true }
    }) // TODO:: Ubah menjadi function search satuan kerja by id

    // Response error jika aplikasi tidak ditemukan
    if (null == searchApp) {
        consoleError(`Applikasi dengan id ${aplikasi} tidak ditemukan`)
        throw new ErrorResponse(400, `Data aplikasi tidak ditemukan`)
    }

    // Response error jika satuan kerja tidak ditemukan
    if (null == searchSatker) {
        consoleError(`Satuan kerja dengan id ${satuan_kerja} tidak ditemukan`)
        throw new ErrorResponse(400, `Data satuan kerja tidak ditemukan`)
    }

    // Duplikasi Aplikasi yang akan di daftarkan
    const checkDuplicate = await checkDuplicateApp(aplikasi)

    // Menghentikan proses karena aplikasi sudah terdaftar
    if (false != checkDuplicate) {
        consoleError(`Aplikasi sudah terdaftar dalam tabel Lokasi Aplikasi`, checkDuplicate)
        throw new ErrorResponse(422, `Aplikasi yang anda pilih sudah terdaftar`)
    }

    // Menjalankan proses simpan data
    return await createAppLocation(data)
}




/**
 * Service untuk mengubah data app location
 * @param id 
 * @param {applikasi, satuan_kerja, status} data 
 * @returns 
 */

export const updateAppLocationService = async (id, data) => {
    // Validasi data mandatory
    await validate(validateUpdateAppLocation, data)

    // Inisialisasi data variable
    const { aplikasi, satuan_kerja, status } = data

    // Check data app location berdasarkan id
    await getAppLocationById(status, id)

    // Validasi data aplikasi
    const searchApp = connection.aPLIKASI.findFirst({
        where: {
            AND: [
                { APLIKASI_ID: aplikasi },
                { APLIKASI_IS_DELETED: false },
            ]
        },
        select: { APLIKASI_ID: true, APLIKASI_NAMA: true }
    }) // TODO:: Ubah menjadi function search application by id

    // Validasi data satuan kerja
    const searchSatker = connection.sATUAN_KERJA.findFirst({
        where: { SATKER_ID: satuan_kerja },
        select: { SATKER_ID: true, SATKER_NAMA: true }
    }) // TODO:: Ubah menjadi function search satuan kerja by id

    // Response error jika aplikasi tidak ditemukan
    if (null == searchApp) {
        consoleError(`aplikasi dengan id ${aplikasi} tidak ditemukan`)
        throw new ErrorResponse(400, `Data aplikasi tidak ditemukan`)
    }

    // Response error jika satuan kerja tidak ditemukan
    if (null == searchSatker) {
        consoleError(`Satuan kerja dengan id ${satuan_kerja} tidak ditemukan`)
        throw new ErrorResponse(400, `Data satuan kerja tidak ditemukan`)
    }

    // Duplikasi Aplikasi yang akan di daftarkan
    const checkDuplicate = await checkDuplicateApp(aplikasi)

    // Menghentikan proses karena aplikasi sudah terdaftar
    if (false != checkDuplicate) {
        consoleError(`Aplikasi sudah terdaftar dalam tabel Lokasi Aplikasi`, checkDuplicate)
        throw new ErrorResponse(422, `Aplikasi yang anda pilih sudah terdaftar`)
    }

    // Menjalankan proses update app location
    return await updateAppLocation(id, data)
}




/**
 * Service untuk menghapus data app location berdasarkan id
 * @param id 
 * @returns 
 */

export const deleteAppLocationService = async (data) => {
    // Inisialisasi variable
    const { id, status } = data

    // Check data app location dengan status aplikasi non-aktif
    await getAppLocationById(status, id)

    // Jalankan proses delete data app location
    return await deleteAppLocation(id)
}