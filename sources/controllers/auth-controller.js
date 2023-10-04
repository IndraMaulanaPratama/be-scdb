import { addUserService, deleteUserService, getAllDataService, getAllTrashService, loginUser, logoutService, refreshTokenService, updateUserService } from "../services/auth-service.js"
import { consoleError, consoleInfo } from "../utils/custom-logger/logger-util.js"
import { ErrorResponse } from "../utils/error-response/error-response-util.js"

/**
 * Controller untuk menampilkan semua data user yang aktif
 */

export const getAll = async (req, res, next) => {
    try {
        // Menjalankan service get data user
        const result = await getAllDataService()

        // Mengembalikan pesan sukses
        res.status(200).json({
            message: `Berhasil menampilkan semua data user`,
            data: result
        })
    } catch (error) {
        consoleError(`Gagal Menampilkan data user`, error.message)
        next(error)
    }
}


/**
 * Controller untuk menampilkan semua data user yang tidak aktif
 */

export const getAllTrash = async (req, res, next) => {
    try {
        // Menjalankan service get data user
        const result = await getAllTrashService()

        // Mengembalikan pesan sukses
        res.status(200).json({
            message: `Berhasil menampilkan semua data user yang tidak aktif`,
            data: result
        })
    } catch (error) {
        consoleError(`Gagal Menampilkan data user yang tidak aktif`, error.message)
        next(error)
    }
}



/**
 * Controller untuk mendaftarkan user dan profile baru
 * @param {username, password, role, name, address, gender, phone_number} req
 */

export const addUser = async (req, res, next) => {
    // Inisialisasi variable
    const data = req.body
    try {
        // Menjalankan service add user
        const result = await addUserService(data)

        // Mengembalikan pesan sukses
        consoleInfo(`Data user dengan email ${data.email} berhasil ditambahkan`, result)
        res.status(200).json({ message: `Data user baru berhasil ditambahkan` })
    } catch (error) {
        consoleError(`Gagal menambahkan data user`, error.message)
        next(error)
    }
}



/**
 * Controller untuk merubah data user dan profile berdasarkan id
 */

export const updateUser = async (req, res, next) => {
    // Inisialisasi Variable
    const { id } = req.params
    const data = req.body

    try {
        // Menjalankan service update data user
        const result = await updateUserService(id, data)

        // Mengembalikan pesan sukses
        consoleInfo(`Data user dengan id ${id} berhasil diperbaharui`, result)
        res.status(200).json({ message: `Data user berhasil dirubah` })
    } catch (error) {
        consoleError(`Gagal merubah data user ${id}`, error.message)
        next(error)
    }
}



/**
 * Controller untuk menghapus data user berdasarkan id
 * @param {id} req 
 */

export const deleteUser = async (req, res, next) => {
    // Inisialisasi variable
    const { id } = req.body

    // Mengembalikan pesan error ketika id tidak terbaca
    if(null == id) {
        consoleError(`Id user tidak terbaca`)
        return res.sendStatus(422)
    }

    try {
        // Menjalankan service hapus data user
        const result = await deleteUserService(id)

        // Mengembalikan pesan sukses
        consoleInfo(`Data user dengan id ${id} berhasil dihapuskan`, result)
        return res.status(200).json({ message: `Data user berhasil dihapuskan` })

    } catch (error) {
        consoleError(`Gagal menghapus data user dengan id ${id}`, error.message)
        next(error)
    }
}



/**
 * Controller untuk login user
 * @param {email, password} req 
 * @param {refreshToken} res 
 * @param {error} next 
 */

export const login = async (req, res, next) => {
    // Inisialisasi variable
    const data = req.body
    const { email } = req.body

    try {
        // Menjalankan service login user
        const result = await loginUser(data)

        // Inisialisasi data result
        const { token, refreshToken } = result

        // Membuat cookie untuk menyimpan token client
        res.cookie(`refresh_token`, token, {
            overwrite: true,
            secure: false, // secure https
            httpOnly: false, // setting agar cookie tidak bersifat public
            maxAge: 6 * 60 * 60 * 1000 // masa aktif cookie (1 hari dalam satuan milisecond/86400)
        })

        // Mengembalikan pesan sukses
        consoleInfo(`User dengan email ${email}, berhasil melakukan login`, { token: refreshToken })
        return res.status(200).json({
            message: `Proses login sukses dijalankan`,
            data: { token: token }
        })

    } catch (error) {
        consoleError(`Gagal melakukan proses login`, error.message)
        next(error)
    }
}



/**
 * Controller untuk logout (keluar dari system)
 * @param {token} req 
 * @param res 
 * @param {error} next 
 */

export const logout = async (req, res, next) => {
    // Inisialisasi variable
    const token = req.cookies.refresh_token

    // Kembalikan pesan error jika token tidak terbaca
    if (!token) {
        consoleError(`Token yang user kirimkan tidak terbaca`, req.cookies)
        throw new ErrorResponse(204) // Status code no-content
    }

    try {
        // Menjalankan service logout
        const result = await logoutService(token)

        // Kembalikan pesan sukses
        consoleInfo(`User berhasil keluar dari system`)
        return res.status(200).json({ message: `Anda berhasil logout dari system` })

    } catch (error) {
        consoleError(`Gagal melakukan proses logout`, error.message)
        next(error)
    }
}



export const refreshToken = async (req, res, next) => {
    // Inisialisasi variable
    const token = req.cookies.refresh_token

    // Mengembalikan pesan error ketika token tidak terbaca
    if (!token) {
        consoleError(`Token tidak terbaca saat refresh_token`, { cookies: req.cookies.refresh_token }) // Status code forbiden
        return res.sendStatus(403)
    }

    try {
        // Menjalankan service refresh token
        const result = await refreshTokenService(token)

        // Inisialisasi data result
        const email = result.email
        const role = result.role
        const newToken = result.token

        // Mengembalikan pesan sukses
        consoleInfo(`Berhasil menjalankan service refresh_token`, { email, role })
        return res.status(200).json({
            message: `Berhasil melakukan proses refresh token`,
            token: newToken
        })
    } catch (error) {
        consoleError(`Gagal melakukan proses refresh token`, error.message)
        next(error)
    }
}