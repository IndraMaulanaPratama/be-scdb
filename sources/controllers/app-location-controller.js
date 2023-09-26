import { createAppLocationService, deleteAppLocationService, getAllAppLocationService, getAllAppLocationServiceById, getAllAppLocationServiceByIdApp, updateAppLocationService } from "../services/app-location-service.js";
import { consoleError, consoleInfo } from "../utils/custom-logger/logger-util.js";


/**
 * Controller untuk menampilkan semua data berdasarkan status
 * @param {status} req 
 * @param {message, data} res 
 * @param {error} next 
 * @returns 
 */

export const getAll = async (req, res, next) => {
    // Inisialisasi variable
    let option
    const { status } = req.params

    try {
        // Menjalankan service get all data
        const result = await getAllAppLocationService(status)

        // Mengembalikan data kepada client
        return res.status(option).json({
            message: `Menampilkan semua data app location dengan status ${status}`,
            data: result
        })

    } catch (error) {
        consoleError(`Terjadi kesalahan pada saat get all data app location`, error.message)
        next(error)
    }
}




/**
 * Controller untuk menambah data baru
 * @param {aplikasi, satuan_kerja} req 
 * @param {message, data} res 
 * @param {error} next 
 * @returns 
 */

export const createData = async (req, res, next) => {
    // Inisialisasi data variable
    const data = req.body

    try {
        // Menjalankan service
        const result = await createAppLocationService(data)

        // mengembalikan response sukses kepada client
        consoleInfo(`Berhasil menambahkan data app location baru`, result)
        return res.status(200).json({
            message: `Data lokasi aplikasi berhasil ditambahkan`
        })

    } catch (error) {
        consoleError(`Terjadi kesalahan pada saat menambah data app location`, error.message)
        next(error)
    }
}




/**
 * Controller untuk mencari data app location berdasarkan id
 * @param {status, id} req 
 * @param {message, data} res 
 * @param {error} next 
 */

export const getDataById = async (req, res, next) => {
    // Inisialisasi data mandatory
    const { status, id } = req.params

    try {
        // Menjalankan service
        const result = await getAllAppLocationServiceById(status, id)

        // Mengembalikan response sukses kepada client
        consoleInfo(`Data app location dengan id ${id} berhasil ditemukan`, result)
        return res.status(200).json({
            message: `Data app location berhasil ditemukan`,
            data: result
        })

    } catch (error) {
        consoleError(`Terjadi kesalahan pada saat get data app location by id`, error.message)
        next(error)
    }
}




/**
 * Controller untuk membaca data app location berdasarkan id aplikasi
 * @param {status, id} req 
 * @param {message, data} res 
 * @param {arror} next 
 */

export const getDataByIdApp = async (req, res, next) => {
    // Inisialisasi data variable
    const { status, id } = req.params
    let appName

    try {
        // Menjalankan service
        const result = await getAllAppLocationServiceByIdApp(status, id)
        appName = result.APLIKASI.APLIKASI_NAMA

        // Mengembalikan response sukses
        return res.status(200).json({
            message: `Berhasil menemukan app location untuk aplikasi ${appName}`,
            data: result
        })

    } catch (error) {
        consoleError(`Terjadi kesalahan pada saat mengambil data app location berdasarkan id aplikasi`, error.message)
        next(error)
    }
}




/**
 * Controller untuk mengubah data app location
 * @param {id, aplikasi, satuan_kerja, status} req 
 * @param {message} res 
 * @param {error} next 
 * @returns 
 */

export const updateData = async (req, res, next) => {
    // Inisialisasi data variable
    const { id } = req.params
    const data = req.body

    try {
        // Menjalankan service
        const result = await updateAppLocationService(id, data)

        // Mengembalikan response sukses kepada client
        consoleInfo(`Data app location dengan id ${id} berhasil di update`, result)
        return res.status(200).json({ message: `Data app location berhasil di perbaharui` })

    } catch (error) {
        consoleError(`App location gagal diupdate`, error.message)
        next(error)
    }
}




/**
 * Controller untuk menghapus data
 * @param {id, status} req 
 * @param {message} res 
 * @param {error} next 
 * @returns 
 */

export const deleteData = async (req, res, next) => {
    // inisialisasi data variable
    const data = req.params
    const { id } = req.params

    try {
        // Menjalankan service
        const result = await deleteAppLocationService(data)

        // Mengembalikan response sukses kepada client
        consoleInfo(`Data app location dengan id ${id} berhasil dihapus`, result)
        return res.status(200).json({ message: `App location berhasil dihapus` })

    } catch (error) {
        consoleError(`Terjadi kesalahan saat menghapus data app location`, error.message)
        next(error)
    }
}