import { consoleError, consoleInfo, ErrorResponse } from "../utils/index.js";
import {
    serviceCreateNewSatker,
    serviceDeleteSatker,
    serviceGetAllSatKer, serviceGetSatkerById, serviceUpdateSatker
} from "../services/index.js";



/**
 * Controller kanggo maca data satuan kerja
 * @param {satuan} req 
 * @param {status, message} res 
 * @param {error} next 
 * @returns 
 */

export const getAll = async (req, res, next) => {
    // nangtoskeun istilah
    const data = req.params
    const { status } = req.params

    try {
        const result = await serviceGetAllSatKer(data)

        // Mengembalikan data kepada client
        return res.status(200).json({
            message: `Menampilkan semua data satuan kerja dengan status ${status}`,
            data: result
        })

    } catch (error) {
        consoleError(`Terjadi kesalahan pada saat get all data satuan kerja`, error.message)
        next(error)
    }
}




/**
 * Controller kanggo milarian satuan kerja dumasar kana id
 * @param {status, id} req 
 * @param {status, data} res 
 * @param {error} next 
 * @returns 
 */

export const getDataById = async (req, res, next) => {
    // nangtoskeun istilah
    const { id } = req.params

    try {
        // ngalakonan pangladen
        const result = await serviceGetSatkerById(id)

        // mulangkeun hasil junun kanggo semah
        return res.status(200).json({
            message: `Data satuan kerja berhasil ditemukan`,
            data: result
        })

    } catch (error) {
        // mulangkeun hasil pogog kanggo semah
        consoleError(`Terjadi kesalahan pada saat get data satuan kerja by id`, error.message)
        next(error)
    }
}




/**
 * Controller kanggo nambihan data satuan kerja
 * @param {nama, lembaga, fakultas, biro, satuan} req 
 * @param {message} res 
 * @param {error} next 
 * @returns 
 */

export const createData = async (req, res, next) => {
    // nangtoskeun istilah
    const data = req.body

    try {
        // ngalakonan pangladen nambihan data
        const result = await serviceCreateNewSatker(data)

        // mulangkeun hasil jujun ka semah
        consoleInfo(`Data baru untuk satuan kerja berhasil ditambahkan`, result)
        return res.status(200).json({
            message: `Data baru unuk satuan kerja berhasil ditambahkan`
        })

    } catch (error) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Terjadi kesalahan saat menambah data satuan kerja`, error.message)
        next(error)
    }
}




/**
 * Controller kanggo ngarobih data satuan kerja
 * @param {nama, lembaga, fakultas, biro, satuan} req 
 * @param {status, message} res 
 * @param {error} next 
 * @returns 
 */

export const updateData = async (req, res, next) => {
    // nangtoskeun istilah
    const data = req.body
    const { id } = req.params

    try {
        // ngalakonan proses robih data
        const result = await serviceUpdateSatker(id, data)

        // mulangkeun hasil jujun ka semah
        consoleInfo(`Satuan kerja dengan id ${id} berhasil diperbaharui`, result)
        return res.status(200).json({
            message: `Data satuan kerja berhasil diperbaharui`
        })

    } catch (error) {
        consoleError(`Terjadi kesalahan saat merubah data satuan kerja dengan id ${id}`, error.message)
        next(error)
    }
}




export const deleteData = async (req, res, next) => {
    // nangtoskeun istilah
    const { id } = req.params

    try {
        // ngalakonan service hapus data satuan kerja
        const result = await serviceDeleteSatker(id)

        // mulangkeun hasil jujun ka semah
        consoleInfo(`Data satuan kerja dengan id ${id} berhasil di hapuskan`, result)
        return res.status(200).json({
            message: `Data satuan kerja berhasil dihapuskan`
        })
        
    } catch (error) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Terjadi kesalahan saat menghapus data satuan kerja`, error.message)
        next(error)
    }
}