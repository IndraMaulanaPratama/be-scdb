import {
    serviceAddNewSatuan,
    serviceDeleteSatuan,
    serviceGetSatuan,
    serviceGetSatuanById,
    serviceRestoreSatuan,
    serviceUpdateSatuan
} from "../services/satuan-service.js";

import {
    consoleError,
    consoleInfo,
    consoleWarn
} from "../utils/index.js";





/**
 * Controller kanggo maca sadaya data
 * @param {status} req 
 * @param {status, message, data} res 
 * @param {error} next 
 * @returns 
 */

export const getAll = async (req, res, next) => {
    // nangtoskeun istilah
    const { status } = req.params

    try {
        // ngalakonan pangladen get all Satuan
        const result = await serviceGetSatuan(status)

        // ngadamel seratan kanggo konsol dumasar kana hasil proses
        if (false == result.length) {
            consoleWarn(`Tidak ada data Satuan untuk ditampilkan`)
        } else {
            consoleInfo(`Berhasil menampilkan semua data Satuan dengan status ${status}`, result[0])
        }

        // mulangkeun hasil junun kanggo semah
        return res.status(200).json({
            message: `Berhasil membaca semua data Satuan dengan status ${status}`,
            data: result
        })

    } catch (error) {
        // mulangkeun hasil pogog kanggo semah
        consoleError(`Terjadi kesalahan saat membaca semua data Satuan`, error.message)
        next(error)
    }
}




/**
 * Controller kanggo milarian data dumasar kana id
 * @param {satuan, id} req 
 * @param {status, message, data} res 
 * @param {error} next 
 * @returns 
 */

export const getById = async (req, res, next) => {
    // nangtoskeun istilah
    const data = req.params
    const { id } = req.params

    try {
        const result = await serviceGetSatuanById(data)

        consoleInfo(`Data Satuan dengan id ${id} berhasil ditemukan`, result)
        return res.status(200).json({
            message: `Data Satuan berhasil ditemukan`,
            data: result
        })

    } catch (error) {
        consoleError(`Terjadi kesalahan saat mencari data Satuan`, error.message)
        next(error)
    }
}




/**
 * Controller kanggo nambih data
 * @param {nama} req 
 * @param {status, message} res 
 * @param {error} next 
 * @returns 
 */

export const addNew = async (req, res, next) => {
    // nangtoskeun istilah
    const data = req.body

    try {
        // ngalakonan pangladen nambih data
        const result = await serviceAddNewSatuan(data)

        // mulangkeun hasil junun ka semah
        consoleInfo(`Data baru untuk Satuan berhasil ditambahkan`)
        return res.status(200).json({
            message: `Data baru untuk Satuan berhasil ditambahkan`
        })

    } catch (error) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Terjadi kesalahan saat menambah data Satuan`, error.message)
        next(error)
    }
}




/**
 * Controller kanggo ngarobih data
 * @param {id, nama} req 
 * @param {status, message} res 
 * @param {error} next 
 * @returns 
 */

export const updateData = async (req, res, next) => {
    // nangtoskeun istilah
    const data = req.body
    const { id } = req.params

    try {
        // ngalakonan pangladen update Satuan
        const result = await serviceUpdateSatuan(id, data)

        // mulangkeun hasil junun ka semah
        consoleInfo(`Data Satuan dengan id ${id} berhasil diperbaharui`, result)
        return res.status(200).json({ message: `Data Satuan berhasil diperbaharui` })

    } catch (error) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Terjadi kesalahan saat memperbaharui Satuan`, error.message)
        next(error)
    }
}




/**
 * Controller kanggo mupus data
 * @param {id} req 
 * @param {status, message} res 
 * @param {error} next 
 */

export const deleteData = async (req, res, next) => {
    // nangtoskeun istilah
    const { id } = req.params

    try {
        // ngalakonan pangladen delete Satuan
        const result = await serviceDeleteSatuan(id)

        // mulangkeun hasil junun ka semah
        return res.status(200).json({ message: `Data Satuan berhasil dihapuskan` })

    } catch (error) {
        // mulangkeun hasis pogog ka semah
        consoleError(`Terjadi kesalahan saat menghapus Satuan`, error.message)
        next(error)
    }
}




/**
 * Controller kanggo mulihkeun data
 * @param {id} req 
 * @param {status, message} res 
 * @param {error} next 
 * @returns 
 */

export const restoreData = async (req, res, next) => {
    // nangtoskeun istilah
    const { id } = req.params

    try {
        // ngalakonan pangladen restore Satuan
        const result = await serviceRestoreSatuan(id)

        // mulangkeun hasil junun ka semah
        consoleInfo(`Data Satuan dengan id ${id} berhasil dipulihkan`, result)
        return res.status(200).json({ message: `Data Satuan berhasil dipulihkan` })

    } catch (error) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Terjadi kesalahan saat memulihkan Satuan`, error.message)
        next(error)
    }
}