import {
    serviceAddNewLembaga,
    serviceDeleteLembaga,
    serviceGetLembaga,
    serviceGetLembagaById,
    serviceRestoreLembaga,
    serviceUpdateLembaga
} from "../services/lembaga-service.js";

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
        // ngalakonan pangladen get all lembaga
        const result = await serviceGetLembaga(status)

        // ngadamel seratan kanggo konsol dumasar kana hasil proses
        if (false == result.length) {
            consoleWarn(`Tidak ada data lembaga untuk ditampilkan`)
        } else {
            consoleInfo(`Berhasil menampilkan semua data lembaga dengan status ${status}`, result[0])
        }

        // mulangkeun hasil junun kanggo semah
        return res.status(200).json({
            message: `Berhasil membaca semua data lembaga dengan status ${status}`,
            data: result
        })

    } catch (error) {
        // mulangkeun hasil pogog kanggo semah
        consoleError(`Terjadi kesalahan saat membaca semua data lembaga`, error.message)
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
        const result = await serviceGetLembagaById(data)

        consoleInfo(`Data lembaga dengan id ${id} berhasil ditemukan`, result)
        return res.status(200).json({
            message: `Data lembaga berhasil ditemukan`,
            data: result
        })

    } catch (error) {
        consoleError(`Terjadi kesalahan saat mencari data lembaga`, error.message)
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
        const result = await serviceAddNewLembaga(data)

        // mulangkeun hasil junun ka semah
        consoleInfo(`Data baru untuk lembaga berhasil ditambahkan`)
        return res.status(200).json({
            message: `Data baru untuk lembaga berhasil ditambahkan`
        })

    } catch (error) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Terjadi kesalahan saat menambah data lembaga`, error.message)
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
        // ngalakonan pangladen update lembaga
        const result = await serviceUpdateLembaga(id, data)

        // mulangkeun hasil junun ka semah
        consoleInfo(`Data lembaga dengan id ${id} berhasil diperbaharui`, result)
        return res.status(200).json({ message: `Data lembaga berhasil diperbaharui` })

    } catch (error) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Terjadi kesalahan saat memperbaharui lembaga`, error.message)
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
        // ngalakonan pangladen delete lembaga
        const result = await serviceDeleteLembaga(id)

        // mulangkeun hasil junun ka semah
        return res.status(200).json({ message: `Data lembaga berhasil dihapuskan` })

    } catch (error) {
        // mulangkeun hasis pogog ka semah
        consoleError(`Terjadi kesalahan saat menghapus lembaga`, error.message)
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
        // ngalakonan pangladen restore lembaga
        const result = await serviceRestoreLembaga(id)

        // mulangkeun hasil junun ka semah
        consoleInfo(`Data lembaga dengan id ${id} berhasil dipulihkan`, result)
        return res.status(200).json({ message: `Data lembaga berhasil dipulihkan` })

    } catch (error) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Terjadi kesalahan saat memulihkan lembaga`, error.message)
        next(error)
    }
}