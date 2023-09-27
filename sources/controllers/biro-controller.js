import {
    serviceAddNewBiro,
    serviceDeleteBiro,
    serviceGetBiro,
    serviceGetBiroById,
    serviceRestoreBiro,
    serviceUpdateBiro
} from "../services/biro-service.js";

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
        // ngalakonan pangladen get all Biro
        const result = await serviceGetBiro(status)

        // ngadamel seratan kanggo konsol dumasar kana hasil proses
        if (false == result.length) {
            consoleWarn(`Tidak ada data Biro untuk ditampilkan`)
        } else {
            consoleInfo(`Berhasil menampilkan semua data Biro dengan status ${status}`, result[0])
        }

        // mulangkeun hasil junun kanggo semah
        return res.status(200).json({
            message: `Berhasil membaca semua data Biro dengan status ${status}`,
            data: result
        })

    } catch (error) {
        // mulangkeun hasil pogog kanggo semah
        consoleError(`Terjadi kesalahan saat membaca semua data Biro`, error.message)
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
        const result = await serviceGetBiroById(data)

        consoleInfo(`Data Biro dengan id ${id} berhasil ditemukan`, result)
        return res.status(200).json({
            message: `Data Biro berhasil ditemukan`,
            data: result
        })

    } catch (error) {
        consoleError(`Terjadi kesalahan saat mencari data Biro`, error.message)
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
        const result = await serviceAddNewBiro(data)

        // mulangkeun hasil junun ka semah
        consoleInfo(`Data baru untuk Biro berhasil ditambahkan`)
        return res.status(200).json({
            message: `Data baru untuk Biro berhasil ditambahkan`
        })

    } catch (error) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Terjadi kesalahan saat menambah data Biro`, error.message)
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
        // ngalakonan pangladen update Biro
        const result = await serviceUpdateBiro(id, data)

        // mulangkeun hasil junun ka semah
        consoleInfo(`Data Biro dengan id ${id} berhasil diperbaharui`, result)
        return res.status(200).json({ message: `Data Biro berhasil diperbaharui` })

    } catch (error) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Terjadi kesalahan saat memperbaharui Biro`, error.message)
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
        // ngalakonan pangladen delete Biro
        const result = await serviceDeleteBiro(id)

        // mulangkeun hasil junun ka semah
        return res.status(200).json({ message: `Data Biro berhasil dihapuskan` })

    } catch (error) {
        // mulangkeun hasis pogog ka semah
        consoleError(`Terjadi kesalahan saat menghapus Biro`, error.message)
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
        // ngalakonan pangladen restore Biro
        const result = await serviceRestoreBiro(id)

        // mulangkeun hasil junun ka semah
        consoleInfo(`Data Biro dengan id ${id} berhasil dipulihkan`, result)
        return res.status(200).json({ message: `Data Biro berhasil dipulihkan` })

    } catch (error) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Terjadi kesalahan saat memulihkan Biro`, error.message)
        next(error)
    }
}