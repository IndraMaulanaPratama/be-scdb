import dotenv from "dotenv/config";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import { connection } from "../core/connection.js";
import { consoleError, consoleInfo, consoleWarn } from "../utils/custom-logger/logger-util.js";
import { validate } from "../validations/validation.js";
import { addNewValidation, loginValidation, updateValidation } from "../validations/auth-validation.js";
import { searchPeranId } from "./role-service.js";
import { ErrorResponse } from "../utils/error-response/error-response-util.js";



/**
 * Menampilkan semua data user yang berstatus aktif
 * @returns 
 */

const getAllData = async () => {
    return await connection.pENGGUNA.findMany({
        where: { PENGGUNA_IS_DELETED: false },
        select: { PENGGUNA_EMAIL: true, PENGGUNA_USERNAME: true, PENGGUNA_IS_DELETED: true }
    })
}



/**
 * Menampilkan semua data user yang non-aktif
 * @returns 
 */

const getAllTrash = async () => {
    return await connection.pENGGUNA.findMany({
        where: { PENGGUNA_IS_DELETED: true },
        select: { PENGGUNA_EMAIL: true, PENGGUNA_USERNAME: true, PENGGUNA_IS_DELETED: true }
    })
}



/**
 * Mencari data user berdasarkan id baik itu aktif atau non-aktif
 * @param id 
 * @returns 
 */

const searchGlobalId = async (id) => {
    const user = await connection.pENGGUNA.findFirst({
        where: { PENGGUNA_ID: id },

        select: {
            PENGGUNA_EMAIL: true,
            PENGGUNA_USERNAME: true,
            PENGGUNA_IS_DELETED: true,

            PERAN: { select: { PERAN_NAMA: true } },

            BIODATA: {
                select: {
                    BIODATA_NAMA: true,
                    BIODATA_ALAMAT: true,
                    BIODATA_JENIS_KELAMIN: true,
                    BIODATA_NOMOR_TELEPON: true,
                }
            }
        }
    })

    if (!user) {
        consoleError(`User dengan id ${id} tidak ditemukan`, user)
        throw new ErrorResponse(404, `User tidak ditemukan`)
    } else {
        return user
    }
}




/**
 * Mencari data user berdasarkan id dan status user dalam keadaan aktif
 * @param id 
 * @returns 
 */

const searchId = async (id) => {
    const user = await connection.pENGGUNA.findFirst({
        where: {
            AND: [
                { PENGGUNA_ID: id },
                { PENGGUNA_IS_DELETED: false }
            ]
        },
        select: { PENGGUNA_EMAIL: true, PENGGUNA_USERNAME: true, PENGGUNA_CREATED_AT: true }
    })

    if (null == user) {
        consoleError(`User dengan id ${id} tidak ditemukan`, user)
        throw new ErrorResponse(404, `Data user tidak ditemukan`)
    }
}



/**
 * Mencari data user berdasarkan id dan status user dalam keadaan non-aktif
 * @param id 
 * @returns 
 */

const searchTrashId = async (id) => {
    return await connection.pENGGUNA.findFirst({
        where: {
            AND: [
                { PENGGUNA_ID: id },
                { PENGGUNA_IS_DELETED: true }
            ]
        },
        select: { PENGGUNA_EMAIL: true, PENGGUNA_USERNAME: true, PENGGUNA_CREATED_AT: true }
    })
}



/**
 * Mencari data user berdasarkan email dengan status user aktif
 * @param email 
 * @returns 
 */

const searchEmail = async (email) => {
    return await connection.pENGGUNA.findFirst({
        where: {
            AND: [
                { PENGGUNA_EMAIL: email },
                { PENGGUNA_IS_DELETED: false }
            ]
        },
        select: {
            PENGGUNA_ID: true,
            PENGGUNA_EMAIL: true,
            PENGGUNA_USERNAME: true,
            PENGGUNA_PASSWORD: true,
            PENGGUNA_CREATED_AT: true,

            PERAN: { select: { PERAN_NAMA: true } }
        }
    })
}



/**
 * Mencari data profile berdasarkan id user
 * @param id 
 * @returns 
 */

const searchProfileId = async (id) => {
    return await connection.bIODATA.findFirst({
        where: { BIODATA_PENGGUNA: id },

        select: {
            BIODATA_ID: true,
            BIODATA_NAMA: true,
            BIODATA_ALAMAT: true,
            BIODATA_JENIS_KELAMIN: true,
            BIODATA_NOMOR_TELEPON: true,

            PENGGUNA: { select: { PENGGUNA_EMAIL: true, PENGGUNA_USERNAME: true } }
        }
    })
}



/**
 * Mencari data user berdasarkan email dengan status user non-aktif
 * @param email 
 * @returns 
 */

const searchTrashEmail = async (email) => {
    return await connection.pENGGUNA.findFirst({
        where: {
            AND: [
                { PENGGUNA_EMAIL: email },
                { PENGGUNA_IS_DELETED: true }
            ]
        },
        select: { PENGGUNA_EMAIL: true, PENGGUNA_USERNAME: true, PENGGUNA_CREATED_AT: true }
    })
}



/**
 * Mencari data user berdasarkan token
 * @param token 
 * @returns 
 */

export const searchToken = async (token) => {
    const user = await connection.pENGGUNA.findFirst({
        where: { PENGGUNA_TOKEN: token },
        select: {
            PENGGUNA_ID: true,
            PENGGUNA_EMAIL: true,
            PENGGUNA_USERNAME: true,
            PENGGUNA_IS_DELETED: true,
            PENGGUNA_TOKEN: true,

            PERAN: { select: { PERAN_NAMA: true } }
        }
    })

    // Mengembalikan pesan error jika data user tidak ditemukan
    if (!user) {
        consoleError(`Tidak ada user yang cocok dengan token ${token}`, user)
        throw new ErrorResponse(204) // status code no content
    }

    return user
}



/**
 * Melakukan validasi Peran berdasarkan id
 * @param peran 
 */

const checkPeran = async (peran) => {
    const result = await searchPeranId(peran)

    // Mengembalikan pesan error karena peran tidak terdaftar
    if (!result) {
        consoleError(`Tidak ditemukan Peran dengan id ${peran}`, peran)
    }

}



/**
 * Menambahkan data user dan profile
 * @param {idUser, idProfile, email, username, hashPassword, peran, nama, alamat, jenis_kelamin, nomor_telepon} req 
 * @returns 
 */

const addUser = async (req) => {
    // Inisialisasi Variable
    const { idUser, idProfile, email, username, hashPassword, peran, nama, alamat, jenis_kelamin, nomor_telepon } = req

    // proses input database
    return await connection.pENGGUNA.create({
        data: {
            PENGGUNA_ID: idUser,
            PENGGUNA_EMAIL: email,
            PENGGUNA_USERNAME: username,
            PENGGUNA_PASSWORD: hashPassword,
            PENGGUNA_TOKEN: null,

            PERAN: { connect: { PERAN_ID: peran } },

            BIODATA: {
                create: {
                    BIODATA_ID: idProfile,
                    BIODATA_NAMA: nama,
                    BIODATA_ALAMAT: alamat,
                    BIODATA_JENIS_KELAMIN: jenis_kelamin,
                    BIODATA_NOMOR_TELEPON: nomor_telepon,
                }
            }
        },

        select: {
            PENGGUNA_EMAIL: true,
            PENGGUNA_USERNAME: true,

            PERAN: { select: { PERAN_NAMA: true } },

            BIODATA: { select: { BIODATA_NAMA: true } }
        }
    })
}



/**
 * Merubah data user dan profile berdasarkan id user
 * @param id 
 * @param idProfile
 * @param {username, password, peran, name, address, gender, phone_number} req 
 * @returns 
 */

const updateUser = async (id, idProfile, req) => {
    // Inisialisasi variable
    const { username, password, peran, nama, alamat, jenis_kelamin, nomor_telepon } = req
    const gensalt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, gensalt)

    return await connection.pENGGUNA.update({
        where: { PENGGUNA_ID: id },

        data: {
            PENGGUNA_USERNAME: username,
            PENGGUNA_PERAN: peran,
            PENGGUNA_PASSWORD: hashPassword,

            BIODATA: {
                update: {
                    where: { BIODATA_ID: idProfile },

                    data: {
                        BIODATA_NAMA: nama,
                        BIODATA_ALAMAT: alamat,
                        BIODATA_JENIS_KELAMIN: jenis_kelamin,
                        BIODATA_NOMOR_TELEPON: nomor_telepon
                    }
                }
            }
        },

        select: { PENGGUNA_ID: true }
    })
}



/**
 * Merubah status user (aktif dan non-aktif)
 * @param id 
 * @param status 
 * @returns 
 */

const updateUserOnly = async (id, data) => {
    return await connection.pENGGUNA.update({
        where: { PENGGUNA_ID: id },
        data: data
    })
}


/**
 * Menghapus data user berdasarkan id
 * @param id 
 * @returns 
 */

const deleteUser = async (id) => {
    return await connection.pENGGUNA.delete({ where: { PENGGUNA_ID: id } })
}




// -------------------------------- *** Do everything what you need, not what you want *** --------------------------------




/**
 * service untuk Menampilkan semua data user yang berstatus aktif
 * @returns 
 */

export const getAllDataService = async () => {
    // proses mencari data kedalam database
    const result = await getAllData()

    // Filtrasi response
    if (false == result.length) {
        consoleInfo(`Tidak ada data user untuk ditampilkan`, result)
    } else {
        consoleInfo(`Berhasil menampilkan semua data user`, result[0])
    }

    return result
}



/**
 * Service untuk menampilkan semua data user yang berstatus non-aktif
 * @returns 
 */

export const getAllTrashService = async () => {
    // proses mencari data kedalam database
    const result = await getAllTrash()

    // Filtrasi response
    if (false == result.length) {
        consoleInfo(`Tidak ada data non-aktif user untuk ditampilkan`, result)
    } else {
        consoleInfo(`Berhasil menampilkan semua data non-aktif user`, result[0])
    }

    return result
}



/**
 * Service untuk menambahkan data user
 * @param {email, username, password, PERAN, name, address, gender, phone_number} req 
 * @returns 
 */

export const addUserService = async (req) => {

    // Memnjalankan validasi data mandatory
    await validate(addNewValidation, req)

    // Inisialisasi variable
    const { email, username, password, peran, nama, alamat, jenis_kelamin, nomor_telepon } = req
    const idUser = uuid()
    const idProfile = uuid()
    const gensalt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, gensalt)
    let data

    // Mencari data use berdasarkan email
    const checkEmail = await searchEmail(email)

    // Mengembalikan pesan error karena email sudah terdaftar
    if (checkEmail) {
        consoleError(`Email sudah terdaftar`, checkEmail)
        throw new ErrorResponse(429, `Email yang anda masukan sudah terdaftar`)
    }

    // Validasi data peran
    await checkPeran(peran)

    // Mendaftarkan user baru
    data = { idUser, idProfile, email, username, hashPassword, peran, nama, alamat, jenis_kelamin, nomor_telepon }
    return await addUser(data)

}



/**
 * Service untuk merubah data user dan profile berdasarkan id user
 * @param  id 
 * @param {username, password, peran, name, address, gender, phone_number} req 
 * @returns 
 */

export const updateUserService = async (id, req) => {
    // Melakukan validasi data mandatory
    await validate(updateValidation, req)

    // Inisialisasi variable
    const { peran } = req

    // Mencari data user berdasarkan id
    await searchId(id)

    // Mencari data profile berdasarkan id user
    const profile = await searchProfileId(id)
    consoleInfo(`Response data profile`, profile)

    // Validasi data peran
    await checkPeran(peran)

    // Melakukan perubahan data
    const idProfile = profile.BIODATA_ID
    return await updateUser(id, idProfile, req)

}



/**
 * Service untuk menghapus data user berdasarkan id
 * @param id 
 * @returns 
 */

export const deleteUserService = async (id) => {
    // Mencari data user berdasarkan id
    const user = await searchGlobalId(id)
    let data

    // Inisialisasi variable
    const status = user.PENGGUNA_IS_DELETED

    // Nonaktifkan user yang berstatus aktif
    if (false == status) {
        data = { PENGGUNA_IS_DELETED: true } // is deleted user = true
        return await updateUserOnly(id, data)
    }

    // Hapus data user yang berstatus non-aktif
    if (true == status) {
        return await deleteUser(id)
    }
}



/**
 * Service untuk melakukan login user menuju system
 * @param {email, password} req 
 * @returns 
 */

export const loginUser = async (req) => {
    // Melakukan validasi data mandatory
    await validate(loginValidation, req)

    // Inisialisasi variable
    const { email, password } = req
    let status, message, data, checkPassword, hashPassword

    // Mencari data user berdasarkan email
    const user = await searchEmail(email)
    consoleInfo(`Response searchEmail`, user)

    // mengembalikan pesan error karena email tidak ditemukan
    if (null == user) {
        consoleError(`user dengan email ${email} tidak ditemukan`, user)
        throw new ErrorResponse(400, `Login gagal, silahkan periksa kembali email dan password anda`)
    }

    // Membaca password database
    hashPassword = user.PENGGUNA_PASSWORD
    checkPassword = await bcrypt.compare(password, hashPassword)

    // Mengembalikan pesan error karena password yang dimasukan tidak sesuai
    if (!checkPassword) {
        consoleError(`password yang diinputkan user ${email}, tidak sesuai`, checkPassword)
        throw new ErrorResponse(400, `Login gagal, silahkan periksa kembali email dan password anda`)
    }

    // Inisialisasi data variable
    const id = user.PENGGUNA_ID
    const username = user.PENGGUNA_USERNAME
    const role = user.PERAN.PERAN_NAMA
    const createdAt = user.PENGGUNA_CREATED_AT
    const keyToken = process.env.KEY_TOKEN
    const keyRefreshToken = process.env.KEY_REFRESH_TOKEN

    // Membuat token
    data = { id, email, username, role, createdAt }
    const token = jwt.sign(data, keyToken, { expiresIn: '1d' }) // Token untuk database
    const refreshToken = jwt.sign(data, keyRefreshToken, { expiresIn: '10m' }) // token untuk client

    // Menyimpan token ke database
    data = { PENGGUNA_TOKEN: token }
    await updateUserOnly(id, data)
    consoleInfo(`Token baru untuk user dengan email ${email}, berhasil disimpan`, { token })

    // Kembalikan refresh token untuk client akses menggunakan cookie
    return { token, refreshToken }
}



/**
 * Service untuk logout (keluar dari system)
 * @param token 
 * @returns 
 */

export const logoutService = async (token) => {
    // Mencari data user berdasarkan user
    const user = await searchToken(token)
    let data

    // Inisialisasi variable
    const id = user.PENGGUNA_ID

    // Reset token yang tersimpan didalam data user
    data = { PENGGUNA_TOKEN: null }
    return await updateUserOnly(id, data)
}


export const refreshTokenService = async (token) => {
    // Inisialisasi variable
    const keyToken = process.env.KEY_TOKEN
    const keyRefreshToken = process.env.KEY_REFRESH_TOKEN

    // Mencari data user yang sesuai dengan token yang ditemukan
    const user = await searchToken(token)

    // Mengembalikan pesan error ketika user tidak ditemukan
    if (null == user) { throw new ErrorResponse(403, null) } // status code forbiden

    // Melakukan verifikasi data token
    const verify = jwt.verify(token, keyToken, (err, decoded) => {

        // Mengembalikan pesan error ketika terdapat kesalahan pada saat verify token
        if (err) { throw new ErrorResponse(403, null) } // Status code forbiden

        // Inisialisasi data payload
        const { id, email, username, role, createdAt } = decoded
        let data = { id, email, username, role, createdAt }

        // Membuat token baru untuk client
        const token = jwt.sign(data, keyRefreshToken, { expiresIn: `60s` })

        // consoleInfo(`response variable`, {email, role, token})

        // Mengembalikan data token dan identitas user
        return { email, role, token }
    })

    return verify
}