import { addNewService, deleteRoleService, getAllService, getRoleService, updateRoleService } from "../services/role-service.js";
import { consoleError, consoleInfo, consoleWarn } from "../utils/custom-logger/logger-util.js";

export const getAll = async (req, res, next) => {
    try {
        // Inisialisasi Variable
        let status
        const role = await getAllService()

        // Inisialisasi data yang akan di kembalikan ke client
        if (false == role.length) {
            consoleWarn(`Tidak ada data role untuk di tampilkan`)
            status = 204 // status code no content
        } else {
            consoleInfo(`Berhasil menampilkan data role`, role[0])
            status = 200 // status code success
        }

        res.status(status).json({
            message: `Menampilkan semua data role`,
            data: role
        })

    } catch (error) {
        consoleError(`Gagal mengambil semua data role`, error.message)
        return res.status(500).json({ message: `Gagal mengambil semua data role` })
    }
}

export const addNew = async (req, res, next) => {

    // Inisialisasi Variable
    const { name } = req.body

    try {
        // Menjalankan service add new role
        const result = await addNewService(req.body)

        // Mengembalikan response sukses
        consoleInfo(`Role dengan nama ${name} berhasil ditambahkan`, result)
        res.status(200).json({ message: `Role dengan nama ${name} berhasil ditambahkan`, data: result })
    } catch (error) {
        // Mengembalikan pesan error kepada middleware error
        consoleError(`Gagal Menambahkan data role`, error.message)
        next(error)
    }
}

export const getRole = async (req, res, next) => {
    // Inisialisasi Variable
    const { id } = req.params

    try {
        // Menjalankan service get data role
        const result = await getRoleService(id)

        // Mengembalikan pesan sukses
        consoleInfo(`Berhasil mencari data role`, result)

        res.status(200).json({
            message: `Data role yang anda cari berhasil ditemukan`,
            data: result
        })
    } catch (error) {
        consoleError(`Gagal mencari data role`, error.message)
        next(error)
    }
}

export const updateRole = async (req, res, next) => {
    // Inisialisasi variable
    const body = req.body

    try {
        // Menjalankan service update role
        const result = await updateRoleService(body)

        // Kembalikan pesan sukses
        consoleInfo(`Berhasil mengubah data role`, result)

        res.status(200).json({
            message: `Data role berhasil diperbaharui`,
        })

    } catch (error) {
        consoleError(`Gagal mengubah data role`, error.message)
        next(error)
    }
}

export const deleteRole = async (req, res, next) => {
    // Inisialisasi variabel
    const { id } = req.params

    try {
        // Jalankan service untuk menghapus data role
        const result = await deleteRoleService(id)

        // Kembalikan pesan sukses menghapus data role
        consoleInfo(`Data role berhasil dihapuskan`, { id })
        res.status(200).json({message: `Data role berhasil dihapuskan`})
        
    } catch (error) {
        consoleError(`Gagal menghapus data role`, error.message)
        next(error)
    }
}