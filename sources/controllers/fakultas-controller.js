import {
    serviceAddNewFakultas,
    serviceDeleteFakultas,
    serviceGetFakultas,
    serviceGetFakultasById,
    serviceRestoreFakultas,
    serviceUpdateFakultas
} from "../services/fakultas-service.js";

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
    consoleInfo(`return req email`, req.email)

    try {
        // ngalakonan pangladen get all fakultas
        const result = await serviceGetFakultas(status)

        // ngadamel seratan kanggo konsol dumasar kana hasil proses
        if (false == result.length) {
            consoleWarn(`Tidak ada data fakultas untuk ditampilkan`)
        } else {
            consoleInfo(`Berhasil menampilkan semua data fakultas dengan status ${status}`, result[0])
        }

        // mulangkeun hasil junun kanggo semah
        return res.status(200).json({
            message: `Berhasil membaca semua data fakultas dengan status ${status}`,
            data: result
        })

    } catch (error) {
        // mulangkeun hasil pogog kanggo semah
        consoleError(`Terjadi kesalahan saat membaca semua data fakultas`, error.message)
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
        const result = await serviceGetFakultasById(data)

        consoleInfo(`Data fakultas dengan id ${id} berhasil ditemukan`, result)
        return res.status(200).json({
            message: `Data fakultas berhasil ditemukan`,
            data: result
        })

    } catch (error) {
        consoleError(`Terjadi kesalahan saat mencari data fakultas`, error.message)
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
        const result = await serviceAddNewFakultas(data)

        // mulangkeun hasil junun ka semah
        consoleInfo(`Data baru untuk fakultas berhasil ditambahkan`)
        return res.status(200).json({
            message: `Data baru untuk fakultas berhasil ditambahkan`
        })

    } catch (error) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Terjadi kesalahan saat menambah data fakultas`, error.message)
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
        // ngalakonan pangladen update fakultas
        const result = await serviceUpdateFakultas(id, data)

        // mulangkeun hasil junun ka semah
        consoleInfo(`Data fakultas dengan id ${id} berhasil diperbaharui`, result)
        return res.status(200).json({ message: `Data fakultas berhasil diperbaharui` })

    } catch (error) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Terjadi kesalahan saat memperbaharui fakultas`, error.message)
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
        // ngalakonan pangladen delete fakultas
        const result = await serviceDeleteFakultas(id)

        // mulangkeun hasil junun ka semah
        return res.status(200).json({ message: `Data fakultas berhasil dihapuskan` })

    } catch (error) {
        // mulangkeun hasis pogog ka semah
        consoleError(`Terjadi kesalahan saat menghapus fakultas`, error.message)
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
        // ngalakonan pangladen restore fakultas
        const result = await serviceRestoreFakultas(id)

        // mulangkeun hasil junun ka semah
        consoleInfo(`Data fakultas dengan id ${id} berhasil dipulihkan`, result)
        return res.status(200).json({ message: `Data fakultas berhasil dipulihkan` })

    } catch (error) {
        // mulangkeun hasil pogog ka semah
        consoleError(`Terjadi kesalahan saat memulihkan fakultas`, error.message)
        next(error)
    }
}